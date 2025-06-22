import { NextRequest, NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import User from '@/models/User'
// import { hashPassword } from '@/lib/password'
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role,  studentId} = await req.json()

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    await connectToDB()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ name: name, email, password: hashedPassword, role, studentId })
    
    const token = generateToken({ id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role })
    
newUser
    return NextResponse.json({ 
      message: 'Registration successful', 
      token, 
      user: { 
        name: newUser.name, 
        email: newUser.email, 
        role: newUser.role, 
        studentId: newUser.studentId 
      } 
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
