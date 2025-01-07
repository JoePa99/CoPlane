-- Create trigger for booking notifications
CREATE OR REPLACE FUNCTION notify_booking_created()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := CONCAT(current_setting('app.settings.supabase_functions_url'), '/schedule-notification'),
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', CONCAT('Bearer ', current_setting('app.settings.service_role_key'))
      ),
      body := jsonb_build_object(
        'type', TG_OP,
        'record', row_to_json(NEW)
      )
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_booking_created ON bookings;
CREATE TRIGGER on_booking_created
  AFTER INSERT ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION notify_booking_created();