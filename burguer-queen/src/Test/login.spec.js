import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Login from '../views/login/login'
import { BrowserRouter } from 'react-router-dom'
import {postLogin} from '../functions/requests'

jest.mock('../functions/requests'/* , () => jest.fn() */)


describe('Test de Login', () => {
   

    it('ingreso de usuario', async () => {

        const resJson = {
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWNlLmhvcHBlckBzeXN0ZXJzLnh5eiIsImlhdCI6MTY2OTg1MzMzNSwiZXhwIjoxNjY5ODU2OTM1LCJzdWIiOiIyIn0.dTllOT6Hgeji3huoGIMVw3NIWA3ZpwaSYsvYJqVy1dM",
            user: {
                email: 'grace.hopper@systers.xyz',
                role: 'admin',
                id: 2
            }
        }
        const loginUserMock = {
            "email": "grace.hopper@systers.xyz",
            "password": "123456",
        }

        postLogin./* mockImplementation */mockResolvedValueOnce/* mockImplementationOnce */(()=>{
                return((email, pasword)=>{
                    return Promise.resolve(({
                        json: () => {
                          return Promise.resolve(resJson)
                        }
                      }))
                })
            })

        render(<Login />, { wrapper: BrowserRouter })

        const inputEmail = screen.getByTestId('emailUserLogin');
        fireEvent.change(inputEmail, { target: { value: loginUserMock.email } });

        const inputPassword = screen.getByTestId('passwordUserLogin');
        fireEvent.change(inputPassword, { target: { value: loginUserMock.password } });

        const buttonSubmit = screen.getByTestId('buttonLogin');
        fireEvent.click(buttonSubmit); /// pte para revisar

        await waitFor(() => {
            expect(postLogin).toHaveBeenCalled();
            expect(postLogin).toHaveBeenCalledTimes(1);
        });
    })

    // it('should render button', () => {
    //     render(<Login />, { wrapper: BrowserRouter })
    //     const buttonSubmitGet = screen.getByTestId('buttonLogin');
    //     expect(buttonSubmitGet).toBeInTheDocument();
    // });

})


