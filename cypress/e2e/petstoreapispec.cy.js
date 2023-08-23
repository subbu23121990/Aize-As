const API_CONFIG = Cypress.env('api')

const username = 'subba12456'


describe('Petstore API Testing', () => {
 it('Create new user', () => {

        cy.request({

            method: 'POST',

            url: API_CONFIG.url + '/user',

            body: {

                "id": 0,

                "username": username,

                "firstName": "subba",

                "lastName": "gopal",

                "email": "subba123@gmail.com",

                "password": "test123",

                "phone": "9871012312",

                "userStatus": 0

              },

        }).then( ( response ) => {

            expect(response.body).to.have.property('code',200);

        })

    })



    it('Get user by name', () => {

        cy.request({

            method: 'GET',

            url: API_CONFIG.url + '/user/' + username,

        }).then( ({ body }) => {

            expect(body.username).to.eq(username)

        })

    })



    it('Delete user by name', () => {

        cy.request({

            method: 'DELETE',

            url: API_CONFIG.url + '/user/' + username,

        }).then( ( response ) => {

            expect(response.body).have.property('code', 200);

        })

    })



  })