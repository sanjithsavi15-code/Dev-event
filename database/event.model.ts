import mongoose, { Schema, Document, Model } from 'mongoose';

// TypeScript interface for Event document
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true,
    },
    overview: {
      type: String,
      required: [true, 'Event overview is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Event image is required'],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, 'Event venue is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String,
      required: [true, 'Event time is required'],
    },
    mode: {
      type: String,
      required: [true, 'Event mode is required'],
      enum: {
        values: ['online', 'offline', 'hybrid'],
        message: 'Mode must be either online, offline, or hybrid',
      },
    },
    audience: {
      type: String,
      required: [true, 'Target audience is required'],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, 'Event agenda is required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'Agenda must have at least one item',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Event organizer is required'],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, 'Event tags are required'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'At least one tag is required',
      },
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  }
);

// Create unique index on slug for faster lookups
EventSchema.index({ slug: 1 }, { unique: true });

/**
 * Pre-save hook to generate slug from title and normalize date/time
 * - Generates URL-friendly slug only when title changes
 * - Validates and normalizes date to ISO format
 * - Ensures time is stored consistently
 */
EventSchema.pre('save', async function () {
  const event = this as IEvent;

  // Generate slug from title if title is modified or new document
  if (event.isModified('title')) {
    event.slug = event.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

    // Ensure slug uniqueness by checking existing slugs
    if (!event.isNew) {
      const existingEvent = await mongoose.models.Event.findOne({
        slug: event.slug,
        _id: { $ne: event._id },
      });

      if (existingEvent) {
        event.slug = `${event.slug}-${Date.now()}`;
      }
    }
  }

  // Normalize date to ISO format if modified
  if (event.isModified('date')) {
    try {
      const parsedDate = new Date(event.date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date format');
      }
      event.date = parsedDate.toISOString().split('T')[0]; // Store as YYYY-MM-DD
    } catch (error) {
      throw new Error('Date must be a valid date string');
    }
  }

  // Normalize time format (HH:MM) if modified
  if (event.isModified('time')) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(event.time)) {
      throw new Error('Time must be in HH:MM format (24-hour)');
    }
  }
});

// Prevent model recompilation in development
const Event: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
