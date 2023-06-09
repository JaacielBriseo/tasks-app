export const formatDateFromNow = (timestamp: string) => {
	const fechaActual = new Date();
	const fechaCreacion = new Date(timestamp);
	const tiempoTranscurrido = Number(fechaActual) - Number(fechaCreacion);

	const minutosTranscurridos = Math.floor(tiempoTranscurrido / (1000 * 60));
	const horasTranscurridas = Math.floor(minutosTranscurridos / 60);

	if (horasTranscurridas > 0) {
		return `Creado hace ${horasTranscurridas} hora(s)`;
	} else {
		return `Creado hace ${minutosTranscurridos} minuto(s)`;
	}
};
