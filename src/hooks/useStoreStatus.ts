import { useState, useEffect, useCallback } from 'react';
import type { Coordinates } from '../types';

export interface StoreStatusHook {
  isOpen: boolean;
  shippingPrice: number;
  distance: string; // Ex: "5.2 km"
  error: string | null;
  calculateShipping: (userCoords?: Coordinates) => Promise<{ shippingPrice: number; distance: string; coordsUsed: Coordinates }>;
}

export const useStoreStatus = (): StoreStatusHook => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const [distance, setDistance] = useState<string>('0.0 km');
  const [error, setError] = useState<string | null>(null);

  // Coordenadas fixas da Pizzaria do Baixinho
  const storeCoords: Coordinates = {
    latitude: -23.4735,
    longitude: -46.6341,
  };

  const checkIfOpen = useCallback((): boolean => {
    const now = new Date();
    const day = now.getDay(); // 0=Domingo, 1=Segunda, ..., 6=Sábado
    const hour = now.getHours();
    const minute = now.getMinutes();
    const timeInHours = hour + minute / 60;

    // Quarta a Domingo (0, 3, 4, 5, 6)
    const isOpenDay = [0, 3, 4, 5, 6].includes(day);
    // 19:30 (19.5) às 23:00 (23.0)
    const isOpenTime = timeInHours >= 19.5 && timeInHours <= 23.0;

    return isOpenDay && isOpenTime;
  }, []);

  useEffect(() => {
    // Define o status inicial
    setIsOpen(checkIfOpen());

    // Atualiza o status a cada minuto
    const interval = setInterval(() => {
      setIsOpen(checkIfOpen());
    }, 60000);

    return () => clearInterval(interval);
  }, [checkIfOpen]);

  // Função para buscar a distância de rota pela API OSRM
  const fetchRouteDistance = async (coords1: Coordinates, coords2: Coordinates): Promise<number> => {
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${coords1.longitude},${coords1.latitude};${coords2.longitude},${coords2.latitude}?overview=false`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        // Distância retornada em metros, converte para quilômetros
        return data.routes[0].distance / 1000;
      } else {
        throw new Error('Não foi possível traçar a rota até este endereço.');
      }
    } catch (err) {
      console.error('Erro na API OSRM:', err);
      // Fallback em caso de erro na API: retorna um erro para não cobrar frete errado
      throw new Error('Falha ao calcular rota.');
    }
  };

  const getUserLocation = (): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalização não suportada pelo seu navegador.'));
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              reject(new Error('Permissão de localização negada pelo usuário.'));
              break;
            case err.POSITION_UNAVAILABLE:
              reject(new Error('Informações de localização indisponíveis (erro de GPS).'));
              break;
            case err.TIMEOUT:
              reject(new Error('A requisição para obter a localização expirou.'));
              break;
            default:
              reject(new Error('Ocorreu um erro desconhecido ao obter a localização.'));
              break;
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  };

  const calculateShipping = useCallback(async (userCoords?: Coordinates): Promise<{ shippingPrice: number; distance: string; coordsUsed: Coordinates }> => {
    try {
      setError(null);

      let coordsToUse = userCoords;
      if (!coordsToUse) {
        coordsToUse = await getUserLocation();
      }

      // Calcula distância em Rota usando OSRM
      const routeDistance = await fetchRouteDistance(storeCoords, coordsToUse);
      const formattedDistance = `${routeDistance.toFixed(1)} km`;

      // Lógica de Preço
      // 1 a 5km: R$ 5,00
      let price = 5;

      if (routeDistance > 5) {
        // A cada 1km adicional acima de 5km: + R$ 1,00 (arredondado para cima)
        const additional = Math.ceil(routeDistance - 5);
        price += additional * 1;
      }

      setDistance(formattedDistance);
      setShippingPrice(price);

      return { shippingPrice: price, distance: formattedDistance, coordsUsed: coordsToUse };
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao calcular frete.';
      setError(errorMessage);
      throw err;
    }
  }, []);

  return {
    isOpen,
    shippingPrice,
    distance,
    error,
    calculateShipping,
  };
};