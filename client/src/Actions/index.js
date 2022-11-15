import { GET_DATA_FROM_SERVER, SORT_CLIENT_AUTHOR_ASC, SORT_CLIENT_AUTHOR_DESC, SORT_CLIENT_NAME_ASC, SORT_CLIENT_NAME_DESC } from "../Constants";

export function getDataFromServer(serverData) {
    return {
        type: GET_DATA_FROM_SERVER,
        payload: serverData
    }
}

export function sortClientNameAsc() {
    return {
        type: SORT_CLIENT_NAME_ASC
    }
}

export function sortClientNameDesc() {
    return {
        type: SORT_CLIENT_NAME_DESC
    }
}

export function sortClientAuthorAsc() {
    return {
        type: SORT_CLIENT_AUTHOR_ASC
    }
}

export function sortClientAuthorDesc() {
    return {
        type: SORT_CLIENT_AUTHOR_DESC
    }
}