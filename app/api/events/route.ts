import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        // Fix: Use req.json() instead of req.formData() to match HTTPie's request format
        let event;
        try {
            event = await req.json();
        } catch (e) {
            return NextResponse.json({ message: "Invalid JSON data format" }, { status: 400 });
        }

        // Create the event in MongoDB
        const createdEvent = await Event.create(event);

        return NextResponse.json(
            { message: "Event Created Successfully", event: createdEvent },
            { status: 201 }
        );
    }
    catch (e) {
        console.error(e);
        return NextResponse.json(
            {
                message: "Event Creation Failed",
                error: e instanceof Error ? e.message : 'Unknown'
            },
            { status: 500 }
        );
    }
}