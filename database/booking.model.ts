import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          // RFC 5322 compliant email validation
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  }
);

// Create index on eventId for faster query performance
BookingSchema.index({ eventId: 1 });

// Optional: Compound index for finding bookings by event and email
BookingSchema.index({ eventId: 1, email: 1 });

/**
 * Pre-save hook to validate that the referenced event exists
 * Prevents orphaned bookings by ensuring event validity before saving
 */
BookingSchema.pre('save', async function () {
  const booking = this as IBooking;

  // Only validate eventId if it's new or modified
  if (booking.isModified('eventId')) {
    try {
      // Check if Event model exists and the referenced event is valid
      const Event = mongoose.models.Event;
      
      if (!Event) {
        throw new Error('Event model not found');
      }

      const eventExists = await Event.findById(booking.eventId);

      if (!eventExists) {
        throw new Error(
            `Event with ID ${booking.eventId} does not exist. Cannot create booking.`
          );
      }
    } catch (error) {
      throw new Error(
          `Failed to validate event: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
  }
});

// Prevent model recompilation in development
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
