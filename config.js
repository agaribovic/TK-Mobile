export default {
    env: process.env.NODE_ENV || 'development',
    apiService: 'http://localhost:3000/api/' ,
    identityService :  'http://localhost:5000/auth/login',
    imageUrl: 'http://www.gigischool.com/images/',
    port: process.env.PORT || 8000,
    secret: 'Time$ch00l',
    currentEmployee:'',
    timeOut: 500,
    loader: true, 
    currentUser:{ id: '', name: ' ', sub: '', cli: '', scopes: [{ role: '', action: '', team: '' }] },
    token:''
}


