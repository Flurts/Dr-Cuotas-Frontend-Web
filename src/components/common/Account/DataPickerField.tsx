import { format } from 'date-fns';
import { ErrorMessage } from 'formik';
import { CalendarIcon } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export const DatePickerField = ({ field, form }: any) => {
  const { t } = useTranslation(['common', 'form']);
  const [showCalendar, setShowCalendar] = React.useState(false);

  const handleDateSelect = (date: any) => {
    form.setFieldValue(field.name, date);
    setShowCalendar(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="dob" className="text-base font-semibold text-slate-800">
        {t('form:dateOfBirth')}
      </label>
      <Popover open={showCalendar}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            onClick={() => {
              setShowCalendar(!showCalendar);
            }}
            className={cn(
              'w-[240px] pl-3 text-left font-normal bg-white border border-[#6636E2] rounded-md text-slate-800 h-8 xl:h-[40px]  px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300',
              !field.value && 'text-muted-foreground',
            )}
          >
            {field.value ? (
              format(new Date(field.value), 'PPP')
            ) : (
              <span>{t('form:pickDate')}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={handleDateSelect}
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <span className="text-sm font-light text-slate-500">
        {t('form:dateOfBirthDescription')}
      </span>
      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-500"
      />
    </div>
  );
};
