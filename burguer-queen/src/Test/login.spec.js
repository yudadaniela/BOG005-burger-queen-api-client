import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Login from '../views/login/login'
import { BrowserRouter } from 'react-router-dom'

jest.mock('../functions/requests'/* , () => jest.fn() */)


describe('Test de Login', () => {
    beforeEach(() => {
        render(<Login />, { wrapper: BrowserRouter })
    })

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

        //postLogin.mockImplementation(()=>{ resJson })//opc 2 :(


        const inputEmail = screen.getByTestId('emailUserLogin');
        fireEvent.change(inputEmail, { target: { value: loginUserMock.email } });

        const inputPassword = screen.getByTestId('passwordUserLogin');
        fireEvent.change(inputPassword, { target: { value: loginUserMock.password } });

        const buttonSubmit = screen.getByTestId('buttonLogin');
        fireEvent.click(buttonSubmit); /// pte para revisar

        await waitFor(() => {
            //expect(postLogin).toHaveBeenCalledTimes(1);
        });
    })



    it('should be a function', () => {
        expect(typeof postLogin).toBe('function')
    });

    it('should render button', () => {
        const buttonSubmitGet = screen.getByTestId('buttonLogin');
        expect(buttonSubmitGet).toBeInTheDocument();
    });


})



        // postLogin.mockResolvedValueOnce(()=>{
        //     return((/* email, password */)=>{
        //         return  Promise.resolve(resJson);
        //     })
        // })