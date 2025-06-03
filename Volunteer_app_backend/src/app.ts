import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import userRoutes from './routes/user';
import projectRoutes from './routes/project'
import categoryRoutes from './routes/category'
import charityRoutes from './routes/charity'
import badgeRoutes from './routes/Badge'
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './utils/swagger';

dotenv.config();

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // Limit each IP to 5 requests per windowMs
    message: 'Too many login attempts, please try again later.',
});

app.use(cors());
app.use(helmet())
app.use(express.json());

// Rate limiting for login endpoint
app.use('/api/users/login', limiter);

// routes
app.use('/api/users', userRoutes);

app.use('/api/projects', projectRoutes);
app.use('/api/categories',categoryRoutes);
app.use('/api/charities', charityRoutes);
app.use('/api/badges',badgeRoutes);

// API documentation    
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


export default app;