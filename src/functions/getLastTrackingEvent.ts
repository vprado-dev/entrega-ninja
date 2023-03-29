import { TrackingProps } from "../@types/TrackingProps";
import { fetchTrackingService } from "../services/rastreioService";

export const getLastTrackingEvent = async (codigo: string) => {
  const rastreio = await fetchTrackingService(codigo);
  const lastUpdate: TrackingProps = rastreio.eventos.reverse().pop();

  return lastUpdate;
};
