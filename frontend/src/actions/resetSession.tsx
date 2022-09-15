function resetSession(delay: number) {
	setTimeout(() => {
		window.sessionStorage.clear()
		window.location.reload()
	}, delay)
}

export default resetSession