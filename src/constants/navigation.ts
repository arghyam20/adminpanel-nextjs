import ArticleIcon from "@mui/icons-material/Article";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import PeopleIcon from "@mui/icons-material/People";
import QuizIcon from "@mui/icons-material/Quiz";
import ReviewsIcon from "@mui/icons-material/Reviews";

import type { SvgIconComponent } from "@mui/icons-material";
import type { Route } from "next";

export interface NavItem {
  label: string;
  href: Route;
  icon: SvgIconComponent;
  permission: string;
}

export const navigationItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardIcon, permission: "dashboard.read" },
  { label: "Users", href: "/dashboard/users", icon: PeopleIcon, permission: "users.read" },
  {
    label: "Categories",
    href: "/dashboard/categories",
    icon: CategoryIcon,
    permission: "categories.read",
  },
  { label: "FAQs", href: "/dashboard/faqs", icon: QuizIcon, permission: "faqs.read" },
  {
    label: "Testimonials",
    href: "/dashboard/testimonials",
    icon: ReviewsIcon,
    permission: "testimonials.read",
  },
  { label: "Blogs", href: "/dashboard/blogs", icon: ArticleIcon, permission: "blogs.read" },
  {
    label: "Service Categories",
    href: "/dashboard/service-categories",
    icon: CategoryIcon,
    permission: "serviceCategories.read",
  },
  {
    label: "Services",
    href: "/dashboard/services",
    icon: MiscellaneousServicesIcon,
    permission: "services.read",
  },
];
