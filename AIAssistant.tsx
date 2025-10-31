import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, RefreshCw, Maximize2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIAssistantProps {
  content: string;
  onApply?: (result: string) => void;
}

export default function AIAssistant({ content, onApply }: AIAssistantProps) {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const callAI = async (action: string) => {
    if (!content.trim()) {
      toast({ title: 'Error', description: 'No content to process', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: { action, content }
      });

      if (error) throw error;
      if (data?.result) {
        setResult(data.result);
        toast({ title: 'Success', description: `AI ${action} completed` });
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => callAI('summarize')}
            disabled={loading}
          >
            Summarize
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => callAI('rewrite')}
            disabled={loading}
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Rewrite
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => callAI('expand')}
            disabled={loading}
          >
            <Maximize2 className="w-4 h-4 mr-1" />
            Expand
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => callAI('suggest-links')}
            disabled={loading}
          >
            Suggest Links
          </Button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        )}

        {result && (
          <div className="space-y-2">
            <Textarea
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="min-h-[120px]"
            />
            {onApply && (
              <Button
                size="sm"
                onClick={() => onApply(result)}
                className="w-full"
              >
                Apply to Note
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
