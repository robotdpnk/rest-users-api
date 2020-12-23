
export const usersData = {
    withInvalidCase: [
        {
            "id": 1,
            "name": "Leanne Graham",
            "username": "Bret",
            "email": "Sincere@april.biz",
            "address": {
            "street": "Kulas Light",
            "suite": "Suite 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
            },
            "phone": "1-770-736-8031 x56442",
            "website": "hildegard.org",
            "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
            }
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "username": "An",
            "email": "Shanna@melissa.tv",
            "address": {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
            "geo": {
                "lat": "-43.9509",
                "lng": "-34.4618"
            }
            },
            "phone": "010-692-6593 x09125",
            "website": "anastasia.net",
            "company": {
            "name": "Deckow-Crist",
            "catchPhrase": "Proactive didactic contingency",
            "bs": "synergize scalable supply-chains"
            }
        },
        {
            "id": 3,
            "name": 1,
            "username": "Samantha",
            "email": "Nathan@yesenia.net",
            "address": {
            "street": "Douglas Extension",
            "suite": "Suite 847",
            "city": "McKenziehaven",
            "zipcode": "59590-4157",
            "geo": {
                "lat": "-68.6102",
                "lng": "-47.0653"
            }
            },
            "phone": "1-463-123-4447",
            "website": "ramiro.info",
            "company": {
            "name": "Romaguera-Jacobson",
            "catchPhrase": "Face to face bifurcated interface",
            "bs": "e-enable strategic applications"
            }
    }],
    withInvalidCaseExpect: [
        {
            "error": "ValidationError",
            "_original": {
            "name": "Ervin Howell",
            "username": "An",
            "address": {
                "street": "Victor Plains",
                "suite": "Suite 879",
                "city": "Wisokyburgh",
                "zipcode": "90566-7771",
                "lat": "-43.9509",
                "lng": "-34.4618"
            },
            "company": {
                "name": "Deckow-Crist",
                "catchPhrase": "Proactive didactic contingency",
                "bs": "synergize scalable supply-chains"
            },
            "contact": {
                "phone": "010-692-6593 x09125",
                "email": "Shanna@melissa.tv",
                "website": "anastasia.net"
            }
            },
            "details": [
            {
                "message": "\"username\" length must be at least 3 characters long",
                "path": [
                "username"
                ],
                "type": "string.min",
                "context": {
                "limit": 3,
                "value": "An",
                "label": "username",
                "key": "username"
                }
            }
            ]
        },
        {
            "error": "ValidationError",
            "_original": {
            "name": 1,
            "username": "Samantha",
            "address": {
                "street": "Douglas Extension",
                "suite": "Suite 847",
                "city": "McKenziehaven",
                "zipcode": "59590-4157",
                "lat": "-68.6102",
                "lng": "-47.0653"
            },
            "company": {
                "name": "Romaguera-Jacobson",
                "catchPhrase": "Face to face bifurcated interface",
                "bs": "e-enable strategic applications"
            },
            "contact": {
                "phone": "1-463-123-4447",
                "email": "Nathan@yesenia.net",
                "website": "ramiro.info"
            }
            },
            "details": [
            {
                "message": "\"name\" must be a string",
                "path": [
                "name"
                ],
                "type": "string.base",
                "context": {
                "label": "name",
                "value": 1,
                "key": "name"
                }
            }
            ]
        },
        {
            "name": "Leanne Graham",
            "username": "Bret",
            "address": {
            "street": "Kulas Light",
            "suite": "Suite 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "lat": -37.3159,
            "lng": 81.1496,
            },
            "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets",
            },
            "contact": {
            "phone": "1-770-736-8031 x56442",
            "email": "Sincere@april.biz",
            "website": "hildegard.org",
            },
        }]
}

