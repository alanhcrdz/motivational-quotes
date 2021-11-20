import { createSelector } from "reselect";

const selectQuote = state => state.quote;

export const selectQuotes = createSelector(
    [selectQuote],
    (quote) => quote.quotes
);

export const selectQuoteMarked = createSelector(
    [selectQuote],
    quote => quote.marked
)

export const selectQuotesCount = createSelector(
    [selectQuotes],
    quotes =>
    quotes.reduce((accQuantity, quote) =>
    accQuantity + quote.quantity, 0 )
)