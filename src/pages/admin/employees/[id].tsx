import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Award,
  Briefcase,
  Calendar,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Dummy employee data - in real app, fetch from API using the ID
const DUMMY_EMPLOYEE = {
  id: "user_1234567890_0",
  name: "Muhammad Hassan",
  email: "muhammad.hassan@forrof.com",
  role: "employee",
  department: "IT",
  dateJoined: "2023-06-15",
  phone: "+971-50-123-4567",
  location: "Dubai, UAE",
  position: "Senior Software Engineer",
  status: "Active",
  avatar: "MH",
  salary: 15000,
  manager: "Ahmed Khan",
  reportingTo: "Ahmed Khan",
  totalProjects: 12,
  completedTasks: 156,
  pendingTasks: 8,
  bio: "Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about building scalable applications and mentoring junior developers.",
  skills: [
    "React",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "AWS",
    "Docker",
    "GraphQL",
    "REST APIs",
  ],
  experience: [
    {
      title: "Senior Software Engineer",
      company: "Forrof Company",
      period: "Jun 2023 - Present",
      description:
        "Led development of multiple projects, mentored 3 junior developers",
    },
    {
      title: "Software Engineer",
      company: "Tech Solutions Ltd",
      period: "Jan 2021 - May 2023",
      description:
        "Developed and maintained web applications using React and Node.js",
    },
    {
      title: "Junior Developer",
      company: "StartUp Inc",
      period: "Jul 2019 - Dec 2020",
      description:
        "Built frontend features and fixed bugs in production systems",
    },
  ],
  education: [
    {
      degree: "Bachelor of Science",
      field: "Computer Science",
      institution: "Dubai University",
      year: 2019,
    },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
    },
    {
      name: "Google Cloud Associate Cloud Engineer",
      issuer: "Google Cloud",
      date: "2022",
    },
  ],
  recentActivity: [
    {
      date: "2024-11-25",
      action: "Completed task",
      description: "API Integration module",
    },
    {
      date: "2024-11-24",
      action: "Created",
      description: "Project documentation",
    },
    {
      date: "2024-11-23",
      action: "Submitted PR",
      description: "Feature: User Dashboard",
    },
    { date: "2024-11-22", action: "Attended", description: "Team meeting" },
  ],
};

const EmployeeDetail = () => {
  const navigate = useNavigate();

  // In real app, fetch employee by ID
  const employee = DUMMY_EMPLOYEE;

  const getDepartmentColor = (dept: string) => {
    const colors: Record<string, string> = {
      IT: "bg-blue-100 text-blue-800",
      HR: "bg-pink-100 text-pink-800",
      SALES: "bg-green-100 text-green-800",
      MARKETING: "bg-purple-100 text-purple-800",
      FINANCE: "bg-yellow-100 text-yellow-800",
      OPERATIONS: "bg-orange-100 text-orange-800",
    };
    return colors[dept] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="">
        <div className="container">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate("/employees")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Employees
          </Button>
          <h1 className="text-3xl font-bold">{employee.name}</h1>
          <p className="text-muted-foreground mt-1">{employee.position}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                    {employee.avatar}
                  </div>
                </div>

                {/* Status and Department */}
                <div className="flex gap-2 mb-6 justify-center flex-wrap">
                  <Badge className={getStatusColor(employee.status)}>
                    {employee.status}
                  </Badge>
                  <Badge className={getDepartmentColor(employee.department)}>
                    {employee.department}
                  </Badge>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`mailto:${employee.email}`}
                      className="text-blue-600 hover:underline truncate"
                    >
                      {employee.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{employee.location}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 border-t pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold">
                      Reports To
                    </p>
                    <p className="text-sm font-medium">
                      {employee.reportingTo}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold">
                      Date Joined
                    </p>
                    <p className="text-sm font-medium">
                      {new Date(employee.dateJoined).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold">
                      Salary
                    </p>
                    <p className="text-sm font-medium">
                      AED {employee.salary?.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 border-t mt-4 pt-4">
                  <Card className="bg-muted">
                    <CardContent className="pt-4 text-center">
                      <p className="text-2xl font-bold">
                        {employee.completedTasks}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Completed Tasks
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted">
                    <CardContent className="pt-4 text-center">
                      <p className="text-2xl font-bold">
                        {employee.totalProjects}
                      </p>
                      <p className="text-xs text-muted-foreground">Projects</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{employee.bio}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Work Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                          Position
                        </p>
                        <p className="text-sm font-medium">
                          {employee.position}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                          Department
                        </p>
                        <p className="text-sm font-medium">
                          {employee.department}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                          Employee ID
                        </p>
                        <p className="text-sm font-medium">{employee.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                          Role
                        </p>
                        <p className="text-sm font-medium capitalize">
                          {employee.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium">
                          Task Completion Rate
                        </p>
                        <p className="text-sm font-semibold">95%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "95%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium">
                          Project Success Rate
                        </p>
                        <p className="text-sm font-semibold">92%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 border-t pt-4 mt-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {employee.completedTasks}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Completed
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-600">
                          {employee.pendingTasks}
                        </p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                          {employee.totalProjects}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Projects
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="space-y-4">
                {employee.experience.map((exp, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="text-lg">{exp.title}</CardTitle>
                      <CardDescription>{exp.company}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </div>
                      <p className="text-sm">{exp.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {employee.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {employee.certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                      >
                        <Award className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">{cert.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {cert.issuer} • {cert.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="space-y-4">
                {employee.education.map((edu, idx) => (
                  <Card key={idx}>
                    <CardHeader>
                      <CardTitle className="text-lg">{edu.degree}</CardTitle>
                      <CardDescription>{edu.field}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        {edu.institution}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Graduated {edu.year}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-3">
                {employee.recentActivity.map((activity, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {activity.action === "Completed" && (
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                              <Clock className="h-4 w-4 text-green-600" />
                            </div>
                          )}
                          {activity.action === "Created" && (
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <FileText className="h-4 w-4 text-blue-600" />
                            </div>
                          )}
                          {activity.action === "Submitted PR" && (
                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                              <Users className="h-4 w-4 text-purple-600" />
                            </div>
                          )}
                          {activity.action === "Attended" && (
                            <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                              <Calendar className="h-4 w-4 text-yellow-600" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {activity.action} {activity.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
