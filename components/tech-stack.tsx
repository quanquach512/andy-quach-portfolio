import type { TechStackItem } from "@/lib/data"

interface TechStackProps {
  data: TechStackItem[]
  badge?: string
  title?: string
  description?: string
}

export function TechStack({ 
  data, 
  badge = "Expertise",
  title = "Tech Stack",
  description = "Technologies and tools I use to bring ideas to life."
}: TechStackProps) {
  return (
    <section id="stack" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase">{badge}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {description}
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map(({category, items}) => (
            <div key={category} className="space-y-4">
              <h3 className="text-sm font-mono text-primary tracking-wider uppercase">
                {category}
              </h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li 
                    key={item}
                    className="text-foreground/80 hover:text-primary transition-colors cursor-default flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
