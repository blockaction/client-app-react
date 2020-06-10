export const makeRewardSchema = () => {
    return (
        {
            "@context": "http://schema.org",
            "@type": "WebPage",
            "mainEntity": {
                "@type": "Reward",
                "image": 'image',
                "title": 'name',
                "excerpt": 'desc',
                "country": 'country',
                "position": 'position',
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": 'rating',
                    "reviewCount": "5"
                },
                "review": [
                    {
                        "@type": "Review",
                        "title": 'name',
                        "reviewRating": {
                            "@type": "Rating",
                            "ratingValue": 'rating'
                        }
                    },
                ]
            }
        }
    )
}