
import React, { useState } from 'react';
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Bell, Clock } from 'lucide-react';

const ReminderDialog = () => {
  const { toast } = useToast();
  const [time, setTime] = useState('18:00');
  const [days, setDays] = useState<string[]>(['everyday']);
  const [notificationType, setNotificationType] = useState('browser');

  const handleSaveReminder = () => {
    // In a real app, this would save to the database and set up notifications
    toast({
      title: "Reminder Set",
      description: `You'll receive reminders ${days.includes('everyday') ? 'everyday' : days.join(', ')} at ${time}.`,
    });
    
    // This would close the dialog in a real app
  };

  const handleDayToggle = (day: string) => {
    if (day === 'everyday') {
      setDays(['everyday']);
      return;
    }
    
    // Remove 'everyday' when selecting specific days
    const newDays = days.filter(d => d !== 'everyday');
    
    if (newDays.includes(day)) {
      setDays(newDays.filter(d => d !== day));
    } else {
      setDays([...newDays, day]);
    }
    
    // If all specific days are selected, switch to 'everyday'
    if (newDays.length === 6 && !newDays.includes(day)) {
      setDays(['everyday']);
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-indigo-500" />
          Set Practice Reminder
        </DialogTitle>
        <DialogDescription>
          Create a reminder to help you maintain your daily streak.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="reminder-time" className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Reminder Time
          </Label>
          <Input 
            id="reminder-time" 
            type="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            className="border-indigo-100 focus-visible:ring-indigo-500"
          />
        </div>
        
        <div className="space-y-3">
          <Label className="block mb-1">Repeat on</Label>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="everyday" 
                checked={days.includes('everyday')} 
                onCheckedChange={() => handleDayToggle('everyday')}
                className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
              />
              <label htmlFor="everyday" className="text-sm cursor-pointer">Everyday</label>
            </div>
            
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="flex items-center space-x-2">
                <Checkbox 
                  id={day} 
                  checked={days.includes('everyday') || days.includes(day)} 
                  onCheckedChange={() => handleDayToggle(day)}
                  disabled={days.includes('everyday')}
                  className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                />
                <label htmlFor={day} className="text-sm cursor-pointer">{day}</label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notification-type">Notification Type</Label>
          <Select value={notificationType} onValueChange={setNotificationType}>
            <SelectTrigger id="notification-type" className="border-indigo-100 focus-visible:ring-indigo-500">
              <SelectValue placeholder="Select notification type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="browser">Browser Notification</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <DialogFooter>
        <Button 
          onClick={handleSaveReminder}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Save Reminder
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ReminderDialog;
