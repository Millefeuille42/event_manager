// Created by millefeuille on 12-Sep-22

import axios from "axios";
import {eventData, eventSub, userData} from "./queriesData";

export async function getAuthLink(): Promise<string> {
	return await axios({
		method: 'get',
		url: process.env.REACT_APP_BACK_URL + "/auth"
	}).then((response) => {
		return response.data
	}).catch((e) => {
		throw e
	})
}

export async function getAuthToken(code: string, state: string): Promise<string> {
	return await axios({
		method: 'get',
		url: process.env.REACT_APP_BACK_URL + `/auth/response?state=${state}&code=${code}`
	}).then((response) => {
		return response.data
	}).catch((e) => {
		throw e
	})
}

export async function getUser(login: string, token: string): Promise<userData> {
	return await axios({
		method: 'get',
		url: process.env.REACT_APP_BACK_URL + "/users/" + login,
		headers: {Authorization: "Bearer " + token}
	}).then((response) => {
		return response.data
	}).catch((e) => {
		throw e
	})
}

export async function getAllEvents(campus: string, token: string): Promise<eventData[]> {
	return await axios({
		method: 'get',
		url: process.env.REACT_APP_BACK_URL + "/events/campus/" + campus,
		headers: {Authorization: "Bearer " + token}
	}).then((response) => {
		return response.data
	}).catch((e) => {
		throw e
	})
}

export async function getSubEvents(login: string, token: string): Promise<eventData[]> {
	return await axios({
		method: 'get',
		url: process.env.REACT_APP_BACK_URL + "/events/user/" + login,
		headers: {Authorization: "Bearer " + token}
	}).then((response) => {
		return response.data
	}).catch((e) => {
		throw e
	})
}

export async function getEventData(id: string, token: string): Promise<eventSub[]> {
	return await axios({
		method: 'get',
		url: process.env.REACT_APP_BACK_URL + "/events/id/" + id,
		headers: {Authorization: "Bearer " + token}
	}).then((response) => {
		return response.data
	}).catch((e) => {
		throw e
	})
}