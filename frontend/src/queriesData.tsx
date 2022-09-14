export interface userData {
    login: string
    email: string
    url: string
    image_url: string
    campus: string
}

export interface eventData {
	id: string
    name: string,
    description: string,
    begin_at: string,
    location: string,
	kind: string
}

export interface eventParsed extends eventData {
	day: string
	month: string
	year: string
}