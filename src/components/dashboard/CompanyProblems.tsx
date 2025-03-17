
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { LockIcon } from 'lucide-react';

interface CompanyProblem {
  id: number;
  title: string;
  company: string;
  difficulty: string;
  locked: boolean;
}

interface CompanyProblemsProps {
  problems: CompanyProblem[];
  unlocked: boolean;
}

const CompanyProblems: React.FC<CompanyProblemsProps> = ({ problems, unlocked }) => {
  const navigate = useNavigate();

  const handleProblemClick = (problemId: number) => {
    navigate(`/practice/${problemId}`);
  };

  const getCompanyColor = (company: string) => {
    const colors: Record<string, string> = {
      'Google': 'bg-blue-100 text-blue-800 border-blue-200',
      'Amazon': 'bg-orange-100 text-orange-800 border-orange-200',
      'Microsoft': 'bg-green-100 text-green-800 border-green-200',
      'Facebook': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Apple': 'bg-gray-100 text-gray-800 border-gray-200',
      'Atlassian': 'bg-blue-100 text-blue-800 border-blue-200',
      'Twitter': 'bg-sky-100 text-sky-800 border-sky-200',
      'Netflix': 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[company] || 'bg-slate-100 text-slate-800 border-slate-200';
  };

  return (
    <Card className="border-indigo-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Company Interview Problems</CardTitle>
        <CardDescription>
          Practice problems frequently asked in top tech company interviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!unlocked ? (
          <div className="bg-gray-50 rounded-md p-4 text-center space-y-2">
            <LockIcon className="h-8 w-8 text-gray-400 mx-auto" />
            <p className="text-sm text-gray-600">
              Complete a 7-day streak to unlock premium company interview problems.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {problems.map((problem) => (
              <div 
                key={problem.id} 
                className="p-3 border rounded-md hover:shadow-sm transition-all flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{problem.title}</span>
                    <Badge variant="outline" className={getCompanyColor(problem.company)}>
                      {problem.company}
                    </Badge>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleProblemClick(problem.id)}
                  disabled={problem.locked}
                  className="border-indigo-100 hover:bg-indigo-50"
                >
                  {problem.locked ? 'Locked' : 'Solve'}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompanyProblems;
