import { EmployeeCard } from "@/components/employees/EmployeeCard";
import { EmployeeFilters } from "@/components/employees/EmployeeFilters";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useEmployees } from "@/hooks/useEmployees";
import { Grid3x3, List, Search } from "lucide-react";
import { useState } from "react";

const Employees = () => {
  const [viewMode, setViewMode] = useState("list");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [role, setRole] = useState("all");
  const [location, setLocation] = useState("all");
  const [status, setStatus] = useState("all");

  const { data, isLoading } = useEmployees(
    page,
    search,
    department === "all" ? "" : department,
    role === "all" ? "" : role,
    location === "all" ? "" : location,
    status === "all" ? "" : status
  );

  return (
    <div className="space-y-6 p-2 sm:p-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold">Employees Details</h1>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 w-full">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-9"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className="flex sm:flex-row flex-col items-center gap-2 self-end sm:self-auto">
          <div className="flex ">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <EmployeeFilters
          
            department={department}
            setDepartment={(val) => {
              setDepartment(val);
              setPage(1);
            }}
            role={role}
            setRole={(val) => {
              setRole(val);
              setPage(1);
            }}
            location={location}
            setLocation={(val) => {
              setLocation(val);
              setPage(1);
            }}
            status={status}
            setStatus={(val) => {
              setStatus(val);
              setPage(1);
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-[400px]" />
              ))}
            </div>
          ) : (
            <Skeleton className="h-[500px] w-full" />
          )}
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data?.employees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <EmployeeTable employees={data?.employees || []} />
            </div>
          )}
        </>
      )}

      {data && data.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 ">
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            Page {page} of {data.totalPages}
          </p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={
                    page === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {Array.from({ length: Math.min(5, data.totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => setPage(pageNum)}
                      isActive={page === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                  className={
                    page === data.totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Employees;
