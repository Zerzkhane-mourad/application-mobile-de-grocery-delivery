export const SET_SELCTED_TAB = "SET_SELCTED_TAB"

export const setSelectedTabSucces = (selectedTab) => ({
    type: SET_SELCTED_TAB,
    payload: { selectedTab }
})

export function setSelectedTab(selectedTab) {
    return dispatch => {
        dispatch(setSelectedTabSucces(selectedTab))
    }
}