import types from "../types"

export function initialLoadInbox(dispatch, data) {
    dispatch({
        type: types.INITIAL_LOADING_INBOX,
        data
    })
}

export function selectedInbox(dispatch, data) {
    dispatch({
        type: types.SELECTED_INBOX,
        data
    })
}

export function updatedInboxNewMessage(dispatch, data) {
    dispatch({
        type: types.INBOX_UPDATE_BY_MESSAGE,
        data
    })
}

export function updatedInboxCounter(dispatch, data) {
    dispatch({
        type: types.INBOX_UPDATE_COUNTER,
        data
    })
}

export function updatedInboxCounterByRead(dispatch, data) {
    dispatch({
        type: types.INBOX_UPDATE_COUNTER_BY_READ,
        data
    })
}

export function newInbox(dispatch, data) {
    dispatch({
        type: types.INBOX_NEW,
        data
    })
}