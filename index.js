import express from 'express';
import corsConfig from './src/core/config/cors.js';
import connectDB from './src/core/database/connection.js';
import globalExceptionHandler from './src/utils/globalException.js';
import logger from './src/core/config/logger.js';
import "dotenv/config"
import responseInterceptor from './src/utils/responseInterceptor.js';
import swaggerDocs from './src/core/config/swagger.js';


import { userRouter , productRouter,customerRouter,companyRouter,purchaseRouter,categoryRouter,orderRouter,invoiceRouter,profileRouter,LogoRouter,EmailRouter,EmployeeRouter,SubCategoryRouter,RegistrationRouter} from './src/routes/routes.js';


const app = express();
swaggerDocs(app);


const PORT = (() => {
    const env = process.env.ENV;
    return env === 'development' ? 7200 : 4545;
})();


app.use("/uploads", express.static( 'uploads'));

app.use(express.json());
app.use(corsConfig);

app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
});

connectDB()
    .then(() => {
        logger.info('Database connected successfully');
    })
    .catch((err) => {
        logger.error(`Database connection failed: ${err.message}`);
    });


// 

app.use(responseInterceptor);
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/customer', customerRouter);
app.use('/api/company', companyRouter);
app.use('/api/purchase', purchaseRouter);
app.use('/api/category',categoryRouter);
app.use('/api/order',orderRouter);
app.use('/api/invoice',invoiceRouter);
app.use('/api/profile',profileRouter);
app.use('/api/Logo',LogoRouter);
app.use('/api/Email',EmailRouter);
app.use('/api/employee',EmployeeRouter);
app.use('/api/Subcategory',SubCategoryRouter);
app.use('/api/registrationData',RegistrationRouter);



app.use(globalExceptionHandler);

app.listen(PORT, () => {
    logger.info(`Server is running at port ${PORT}`);
});
