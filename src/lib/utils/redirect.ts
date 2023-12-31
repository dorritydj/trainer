export function redirect(path: string, body?: string) {
	return new Response(body, {
		status: 303,
		headers: { location: path }
	});
}
