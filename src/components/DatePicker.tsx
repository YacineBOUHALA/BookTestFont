import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { DateRange } from 'react-day-picker';
import { Toaster } from 'sonner';

interface DatePickerProps {
  handleDate: (value: DateRange | undefined) => void;
}

const DatePicker = ({ handleDate }: DatePickerProps) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [isClose, setIsClose] = useState(true);

  useEffect(() => {
    if (date?.to !== undefined && date.from !== undefined) {
      setIsClose(true);
      handleDate(date)
    }
  }, [date]);

  return (
    <Popover open={!isClose}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setIsClose(false)}
          id="date"
          className={cn(
            'justify-start text-left font-normal bg-black text-white h-[40px]',
            !date && 'text-muted-foreground w-[300px]'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
              </>
            ) : (
              format(date.from, 'LLL dd, y')
            )
          ) : (
            <span>Louer</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          fromDate={new Date()}
        />
      </PopoverContent>
      <Toaster />
    </Popover>
  );
};

export default DatePicker;
