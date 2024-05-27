import { ADDRGETNETWORKPARAMS } from "dns";
import Finds from "../models/Finds.js";
import User from "../models/User.js";
import path, {dirname} from "path";
import { fileURLToPath } from "url";

//Створити оголошення
export const createFinds = async (req, res) => {
    try {
        const { title, text, city, contacts} = req.body
        const user = await User.findById(req.userId)

        if(req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
         
            const newFindsWithImage = new Finds({
                username: user.username,
                title,
                text,
                city,
                contacts,
                imgUrl: fileName,
                author: req.userId,
            })

            await newFindsWithImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: { finds: newFindsWithImage },
            })

            return res.json(newFindsWithImage)
        }

        const newFindsWithoutImage = new Finds({
            username: user.username,    
                title,
                text,
                city,
                contacts,
                imgUrl: '',
                author: req.userId,
        })
            await newFindsWithoutImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: { finds: newFindsWithoutImage },
            })
            res.json(newFindsWithoutImage)

    } catch (error) {
        res.json({ message: 'Помилка2.'})
    }
}
//Усі оголошення
export const getAll = async (req, res) => {
    try {
        const finds = await Finds.find().sort('-createdAt')
        const popularFinds = await Finds.find().limit(7).sort('-views')
        if (!finds) {
            return res.json({ message: 'Оголошень немає'})
        }

        res.json({ finds, popularFinds})
    } catch (error) {
        res.json({message: ' Помилка '})
    }
} 
//Усі оголошення по іd
export const getById = async (req, res) => {
    try {
        const finds = await Finds.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        })
        res.json(finds)
    } catch (error) {
        res.json({message: ' Помилка '})
    }
} 
//Усі оголошення користувача
export const getMyFinds  = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.finds.map(finds => {
                return Finds.findById(finds._id)
            })
        )

        res.json(list)
    } catch (error) {
        res.json({message: ' Помилка '})
    }
} 

//Видалення оголошення 
export const removeFinds  = async (req, res) => {
    try {
        const finds = await Finds.findByIdAndDelete(req.params.id)
        if(!finds) return res.json ({message: 'Такого оголошення не існує'})

       await User.findByIdAndUpdate(req.userId, {
        $pull: { finds: req.params.id},
       })

        res.json({message: 'Оголошення видалено'})
    } catch (error) {
        res.json({message: ' Помилка '})
    }
} 

//Редагування оголошення
export const updateFinds  = async (req, res) => {
    try {
        const {title, text, city, contacts, id} = req.body    
        const finds = await Finds.findById(id)

        if(req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            finds.imgUrl = fileName || ''
        }

        finds.title = title
        finds.text = text
        finds.city = city
        finds.contacts = contacts

        await finds.save()

        res.json(finds)
    } catch (error) {
        res.json({message: ' Помилка '})
    }
} 