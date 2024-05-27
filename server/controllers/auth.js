import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//Реєстрація
export const register = async (req, res) => {
    try {
        const { username, password } = req.body

        const isUsed = await User.findOne({ username })

        if(isUsed) {
          return res.json({
               message: 'Iмя користувача вже заняте.',
          })
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        
        const newUser = new User({
            username,
            password: hash,
        })

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            {expiresIn: '30d'},
        )

        await newUser.save()

        res.json({
            newUser,
            message: 'Реєстрація успішна',
        })
    } catch (error) {
        res.json({ message: 'Помилка створення користувача!'})
    }
}
//Логін
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({username})
        if(!user) {
            return res.json({
                message: 'Неіснує такого користувача!'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        
        if (!isPasswordCorrect) {
            return res.json({
                message: 'Пароль невірний',
            })
        }

        const token = jwt.sign({
            id: user._id,
        },
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
        )

        res.json({
            token, user,message: 'Вхід успішний!',
        })

    } catch (error) {
        res.json({ message: 'Помилка входу!'})
    }
}

//Авторизація
export const autef = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user) {
            return res.json({
                message: 'Неіснує такого користувача!'
            })
        }

        const token = jwt.sign({
            id: user._id,
        },
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
        )

        res.json({
            user,
            toke,
        })
    } catch (error) {
        res.json({ message: 'Доступу немає!'})
    }
} 