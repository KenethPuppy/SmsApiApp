/*import { mongoose } from "mongoose";
import AdminJS from 'adminjs'
import { Book } from "./bookModel/book.model.js"
import AdminJSMongoose from '@adminjs/mongoose'
import AdminJSExpress from '@adminjs/express'
import express from 'express'

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

const PORT = 3000

const startAdminJS = async () => {
  const app = express();
  const mongooseDB = await mongoose
    .connect(
        'mongodb://127.0.0.1:27017/smsApiTest',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));

  const BookResourceOptions = {
    databases: [mongooseDB],
    resource: Book,
  };

  const adminOptions = {
    rootPath: "/admin",
    resources: [BookResourceOptions],
  };

  const admin = new AdminJS(adminOptions);

  const adminRouter = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}, AdminJS server started on URL: http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

startAdminJS()*/

import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express, { Request, Response } from 'express'
// ... other imports
import mongoose from 'mongoose'
import * as AdminJSMongoose from '@adminjs/mongoose'
import { locales as AdminJSLocales } from 'adminjs'
import { NumberPhoneModel } from './numberPhone.entity.js'
import { SmsModel } from './sms.entity.js'
import fetch from 'node-fetch';

interface GetNumberRequest {
  action: string;
  key: string;
  country: string;
  service: string;
  operator: string;
  sum: number;
  exceptionPhoneSet: string[];
}

interface FinishActivationRequest {
  activationId: number;
  status: number;
  action: string;
  key: string;
}

interface GetServicesRequest {
  action: string;
  key: string;
}

interface SaveSmsRequest {
  phone: string;
  phone_from: string;
  text: string;
}

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

// ... other code
const start = async () => {
  const app = express()
  await mongoose.connect('mongodb://127.0.0.1:27017/smsApiTest')
  const adminOptions = {
    // We pass Category to `resources`
    resources: [NumberPhoneModel, SmsModel],
    locale: { 
      language: 'ru', // default language of application (also fallback)
      availableLanguages: Object.keys(AdminJSLocales), 
    }
  }
  // Please note that some plugins don't need you to create AdminJS instance manually,
  // instead you would just pass `adminOptions` into the plugin directly,
  // an example would be "@adminjs/hapi"
  const admin = new AdminJS(adminOptions)
  const adminRouter = AdminJSExpress.buildRouter(admin)
  
  app.use(admin.options.rootPath, adminRouter)
  app.use(express.json())

  app.post('/api/message', (req: Request<{}, {}, SaveSmsRequest>, res: Response) => {
    console.log(req.body)
    const { phone, phone_from, text } = req.body;
    if (!phone || !phone_from || !text) {
      return res.status(400).json({ error: 'Необходимо заполнить все поля' });
    }
    const phoneFrom = phone_from;
    saveSms({phone, phoneFrom, text})
    res.json({ message: 'Сообщение успешно Сохранено' });
  });



  app.post('/api/get-number', (req: Request<{}, {}, GetNumberRequest>, res: Response) => {
    const { action, key, country, service, operator, sum, exceptionPhoneSet } = req.body;
    console.log(req.body)
    // Далее можно обрабатывать полученные данные
    // Например, выполнить какую-то логику и вернуть ответ
  
    res.send('Success');
  });

  app.post('/api/finish-activation', (req: Request<{}, {}, FinishActivationRequest>, res: Response) => {
    const { activationId, status, action, key } = req.body;
  
    // Далее можно обрабатывать полученные данные
    // Например, выполнить какую-то логику и вернуть ответ
  
    res.send('Success');
  });

  app.post('/api/get-services', (req: Request<{}, {}, GetServicesRequest>, res: Response) => {
    const { action, key } = req.body;
    
    // Далее можно обрабатывать полученные данные
    // Например, выполнить какую-то логику и вернуть ответ
  
    res.send('Success');
  });

  app.post('/api/get-sms', (req: Request, res: Response) => {
    const { text } = req.body;
    console.log(text)
    
    // Далее можно обрабатывать полученные данные
    // Например, выполнить какую-то логику и вернуть ответ
  
    res.send('Success');
  });



  app.listen(3000, () => {
    console.log(`AdminJS started on http://localhost:${3000}${admin.options.rootPath}`)
  })
}

start()


/*const findSms = async () => {
  const filter = { text: test }
  const update = { text: "vagina" }
  const sms: any = await SmsModel.findOneAndUpdate(filter, update, { new: true })
  console.log(sms)
  if (sms) {
    console.log("Win!")
  }
}*/

const saveSms = async (data: any) => {
  const { phone, phoneFrom, text } = data
  /*const phoneNumber: any = await NumberPhoneModel.findOne({ phone })
  if (phoneNumber._id) {}*/
  const sms: any = new SmsModel( { phone: phone, phoneFrom: phoneFrom, text: text } )
  await sms.save()
}



export const fetchSms = async (text: any) => {
  try {
    console.log("fetch")
    const url = `http://localhost:3000/api/get-sms`
    const body = {"text": text}
    const response = await fetch(url,{
      method: 'POST',
        headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      }
      );
    const data = await response.json();
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

/*let metadata = ['hui', 'hui', 'hui', 'hui', 'hui','hui', 'hui', 'hui', 'hui', 'hui','hui', 'hui', 'hui', 'hui', 'hui','hui', 'hui', 'hui', 'hui', 'hui','hui', 'hui', 'hui', 'hui', 'hui']



setTimeout(() => {
  let testik = metadata.map(async (text) => {
    await fetchSms(text);
  });
}, 10000)*/

