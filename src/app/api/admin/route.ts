import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, action } = await request.json();

    if (action === "create-admin") {
      // Check if admin already exists
      const existingAdmin = await prisma.user.findFirst({
        where: { role: "ADMIN" }
      });

      if (existingAdmin) {
        return NextResponse.json(
          { error: "Admin user already exists" },
          { status: 400 }
        );
      }

      // Create admin user
      const hashedPassword = await bcrypt.hash(password, 12);

      const admin = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: "ADMIN",
        }
      });

      return NextResponse.json({
        message: "Admin user created successfully",
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        }
      });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Admin creation error:", error);
    return NextResponse.json(
      { error: "Failed to create admin user" },
      { status: 500 }
    );
  }
}
