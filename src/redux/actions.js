import { AsyncStorage } from "react-native";

export const CREATE_QUOTE = 'CREATE_QUOTE';
export const READ_QUOTE = 'READ_QUOTE';
export const UPDATE_QUOTE = 'UPDATE_QUOTE';
export const DELETE_QUOTE = 'DELETE_QUOTE';


// Add Quote - CREATE
export function addQuote(quote){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null){
                quotes = JSON.parse(quotes);
                quotes.unshift(quote); //add the new quote to the top
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({type: CREATE_QUOTE, quote:quote});
                });
            }
        });
    };
}

// Get Data - READ
export function getQuotes(){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null){
                dispatch({type: READ_QUOTE, quotes:JSON.parse(quotes)});
            }
        });
    };
}

// Update Quote - UPDATE
export function updateQuote(quote){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null){
                quotes = JSON.parse(quotes);
                var index = getIndex(quotes, quote.id); //find the index of the quote with the id passed
                if (index !== -1) {
                    quotes[index]['author'] = quote.author;
                    quotes[index]['quote'] = quote.quote;
                }
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({type: UPDATE_QUOTE, quote:quote});
                });
            }
        });
    };
}

// Delete Quote - DELETE
export function deleteQuote(id){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null){
                quotes = JSON.parse(quotes);

                var index = getIndex(quotes, id); //find the index of the quote with the id passed
                if(index !== -1) quotes.splice(index, 1);//if yes, undo, remove the QUOTE
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({type: DELETE_QUOTE, id:id});
                });
            }
        });
    };
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}