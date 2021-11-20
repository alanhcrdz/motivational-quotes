export const addQuoteToFavorite = (quotes, quoteToAdd) => {
    const existingQuote = quotes.find(
        quote => quote.id === quoteToAdd.id
    );

    if (existingQuote) {
        return quotes.map(quote =>
            quote.id === quoteToAdd.id
            ? {...quote, quantity: quote.quantity + 1}
            : quote
            
        )
    }
    return [...quotes, {...quoteToAdd, quantity: 1}]
}

export const removeQuoteFromFavorites = (quotes, quoteToRemove) => {
    const existingQuote = quotes.find(
        quote => quote.id === quoteToRemove.id
    )

    if (existingQuote.quantity === 1) {
        return quotes.filter(quote => quote.id !== quoteToRemove.id)
    }

    return quotes.map(
        quote => 
        quote.id === quoteToRemove.id ?
        {...quote, quantity: quote.quantity - 1}
        : quote
    );
};