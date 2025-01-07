-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS on_booking_created ON bookings;

-- Drop the function if it exists
DROP FUNCTION IF EXISTS notify_booking_created;

-- Drop the http extension
DROP EXTENSION IF EXISTS http;