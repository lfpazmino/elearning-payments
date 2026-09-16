import { HomeBody } from "@/components/HomeBody";
import { course } from "@/content";
import { FLAT } from "@/lib/course";

export default function HomePage() {
  return (
    <div className="pane">
      <div className="hero">
        <span className="eyebrow">Fast-enablement programme</span>
        <h1>{course.meta.title}</h1>
        <p className="lede">
          {course.meta.tagline}. {course.modules.length} modules, {FLAT.length} units, every linked
          resource free.
        </p>
        <p className="meta">
          {course.meta.event} · Figures verified {course.meta.verified}
        </p>
      </div>
      <HomeBody />
    </div>
  );
}
