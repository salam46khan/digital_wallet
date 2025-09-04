import { Transaction } from "../transaction/transaction.model"
import { Role } from "../user/user.interface"
import { User } from "../user/user.model"
import { Wallet } from "../wallet/wallet.model"

const getUsers = async()=>{
    const users = await User.find()
    return users
}
const getAgents = async()=>{
    const users = await User.find()
    const agents = users.filter(user => user.role === Role.AGENT)
    return agents
}

const getWallets = async()=>{
    const wallets = await Wallet.find()
    return wallets
}
const getTransactions = async()=>{
    const transactions = await Transaction.find()
    return transactions
}
export const AdminService ={
    getUsers,
    getAgents,
    getWallets,
    getTransactions
}