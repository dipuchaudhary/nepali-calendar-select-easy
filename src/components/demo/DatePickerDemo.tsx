import React, { useState } from 'react';
import { NepaliDatePicker } from '@/components/ui/nepali-date-picker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Settings, Code, Globe } from 'lucide-react';
import { NepaliDate, formatNepaliDate, nepaliToGregorian, getCurrentNepaliDate } from '@/lib/nepali-date';

export const DatePickerDemo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<NepaliDate | undefined>();
  const [language, setLanguage] = useState<'nepali' | 'english'>('english');
  const [theme, setTheme] = useState<'default' | 'traditional' | 'modern'>('default');
  const [format, setFormat] = useState<'short' | 'medium' | 'long'>('medium');
  const [showToday, setShowToday] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const handleDateChange = (date: NepaliDate) => {
    setSelectedDate(date);
  };

  const convertedDate = selectedDate ? nepaliToGregorian(selectedDate) : null;
  const currentNepaliDate = getCurrentNepaliDate();

  const codeExample = `import { NepaliDatePicker } from '@/components/ui/nepali-date-picker';
import { NepaliDate } from '@/lib/nepali-date';

const [date, setDate] = useState<NepaliDate>();

<NepaliDatePicker
  value={date}
  onChange={setDate}
  language="${language}"
  theme="${theme}"
  format="${format}"
  showToday={${showToday}}
  placeholder="Select a Nepali date"
/>`;

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Calendar className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-nepali bg-clip-text text-transparent">
            Nepali Date Picker
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive Bikram Sambat calendar component with full customization features, 
          date conversion, and beautiful themes.
        </p>
        <div className="flex items-center justify-center space-x-2">
          <Badge variant="secondary" className="bg-nepali-red text-white">
            Bikram Sambat
          </Badge>
          <Badge variant="secondary" className="bg-nepali-blue text-white">
            Date Conversion
          </Badge>
          <Badge variant="secondary" className="bg-nepali-saffron text-white">
            Multiple Themes
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="demo" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="demo" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Live Demo</span>
          </TabsTrigger>
          <TabsTrigger value="customization" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Customization</span>
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center space-x-2">
            <Code className="h-4 w-4" />
            <span>Code Example</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="demo" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date Picker Demo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Date Picker</span>
                </CardTitle>
                <CardDescription>
                  Select a Nepali date using the interactive calendar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <NepaliDatePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                  language={language}
                  theme={theme}
                  format={format}
                  showToday={showToday}
                  disabled={disabled}
                  placeholder="Choose a Nepali date"
                  className="w-full"
                />
                
                {selectedDate && (
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Selected Nepali Date:</span>
                      <span className="text-primary font-semibold">
                        {formatNepaliDate(selectedDate, format, language)}
                      </span>
                    </div>
                    {convertedDate && (
                      <div className="flex justify-between">
                        <span className="font-medium">Gregorian Date:</span>
                        <span className="text-success font-semibold">
                          {convertedDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Current Date Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span>Current Date Information</span>
                </CardTitle>
                <CardDescription>
                  Today's date in both calendars
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-nepali rounded-lg text-white">
                    <div className="text-sm opacity-90">Today (Nepali)</div>
                    <div className="font-bold text-lg">
                      {formatNepaliDate(currentNepaliDate, 'long', 'english')}
                    </div>
                    <div className="text-sm opacity-90">
                      {formatNepaliDate(currentNepaliDate, 'long', 'nepali')}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gradient-subtle rounded-lg">
                    <div className="text-sm text-muted-foreground">Today (Gregorian)</div>
                    <div className="font-bold text-lg">
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'long'
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customization Options</CardTitle>
              <CardDescription>
                Customize the appearance and behavior of the date picker
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={language} onValueChange={(value: 'nepali' | 'english') => setLanguage(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="nepali">नेपाली</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select value={theme} onValueChange={(value: 'default' | 'traditional' | 'modern') => setTheme(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="traditional">Traditional</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select value={format} onValueChange={(value: 'short' | 'medium' | 'long') => setFormat(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (2081/01/15)</SelectItem>
                        <SelectItem value="medium">Medium (15 Baisakh 2081)</SelectItem>
                        <SelectItem value="long">Long (15 Baisakh, 2081)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-today">Show Today Button</Label>
                    <Switch
                      id="show-today"
                      checked={showToday}
                      onCheckedChange={setShowToday}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="disabled">Disabled State</Label>
                    <Switch
                      id="disabled"
                      checked={disabled}
                      onCheckedChange={setDisabled}
                    />
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Theme Preview</h4>
                    <div className="text-sm text-muted-foreground">
                      {theme === 'default' && 'Clean and minimal design with subtle shadows'}
                      {theme === 'traditional' && 'Nepali flag colors with gradient background'}
                      {theme === 'modern' && 'Contemporary design with smooth transitions'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              <div className="mt-6 p-4 border rounded-lg">
                <Label className="mb-4 block">Live Preview</Label>
                <NepaliDatePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                  language={language}
                  theme={theme}
                  format={format}
                  showToday={showToday}
                  disabled={disabled}
                  placeholder="Customized date picker"
                  className="max-w-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Code Example</CardTitle>
              <CardDescription>
                Copy and paste this code to use the Nepali Date Picker in your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{codeExample}</code>
                </pre>
                <Button
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => navigator.clipboard.writeText(codeExample)}
                >
                  Copy Code
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>
                Available props and their descriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Prop</th>
                      <th className="text-left p-2 font-medium">Type</th>
                      <th className="text-left p-2 font-medium">Default</th>
                      <th className="text-left p-2 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="p-2 font-mono">value</td>
                      <td className="p-2">NepaliDate</td>
                      <td className="p-2">undefined</td>
                      <td className="p-2">Selected date value</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onChange</td>
                      <td className="p-2">(date: NepaliDate) =&gt; void</td>
                      <td className="p-2">undefined</td>
                      <td className="p-2">Callback when date changes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">language</td>
                      <td className="p-2">'nepali' | 'english'</td>
                      <td className="p-2">'english'</td>
                      <td className="p-2">Display language</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">theme</td>
                      <td className="p-2">'default' | 'traditional' | 'modern'</td>
                      <td className="p-2">'default'</td>
                      <td className="p-2">Visual theme</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">format</td>
                      <td className="p-2">'short' | 'medium' | 'long'</td>
                      <td className="p-2">'medium'</td>
                      <td className="p-2">Date display format</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">showToday</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">true</td>
                      <td className="p-2">Show today button</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">disabled</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Disable the picker</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">minDate</td>
                      <td className="p-2">NepaliDate</td>
                      <td className="p-2">undefined</td>
                      <td className="p-2">Minimum selectable date</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">maxDate</td>
                      <td className="p-2">NepaliDate</td>
                      <td className="p-2">undefined</td>
                      <td className="p-2">Maximum selectable date</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};