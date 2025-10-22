import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

describe('GitHub Actions CI Workflow', () => {
  let workflowContent: string
  let workflowYaml: any

  beforeAll(() => {
    const workflowPath = path.join(process.cwd(), '.github/workflows/ci.yaml')
    workflowContent = fs.readFileSync(workflowPath, 'utf-8')
    workflowYaml = yaml.load(workflowContent)
  })

  describe('File Structure and Validity', () => {
    it('should exist as a valid file', () => {
      const workflowPath = path.join(process.cwd(), '.github/workflows/ci.yaml')
      expect(fs.existsSync(workflowPath)).toBe(true)
    })

    it('should be valid YAML', () => {
      expect(() => yaml.load(workflowContent)).not.toThrow()
    })

    it('should parse into an object', () => {
      expect(workflowYaml).toBeDefined()
      expect(typeof workflowYaml).toBe('object')
    })

    it('should not be empty', () => {
      expect(workflowContent.trim().length).toBeGreaterThan(0)
    })
  })

  describe('Workflow Metadata', () => {
    it('should have a name property', () => {
      expect(workflowYaml).toHaveProperty('name')
    })

    it('should have name set to "CI"', () => {
      expect(workflowYaml.name).toBe('CI')
    })

    it('should have trigger configuration', () => {
      expect(workflowYaml).toHaveProperty('on')
    })

    it('should trigger on push events', () => {
      const triggers = Array.isArray(workflowYaml.on) ? workflowYaml.on : [workflowYaml.on]
      expect(triggers).toContain('push')
    })
  })

  describe('Jobs Configuration', () => {
    it('should have jobs defined', () => {
      expect(workflowYaml).toHaveProperty('jobs')
      expect(typeof workflowYaml.jobs).toBe('object')
    })

    it('should have a build job', () => {
      expect(workflowYaml.jobs).toHaveProperty('build')
    })

    it('should specify runs-on for build job', () => {
      expect(workflowYaml.jobs.build).toHaveProperty('runs-on')
    })

    it('should run on ubuntu-latest', () => {
      expect(workflowYaml.jobs.build['runs-on']).toBe('ubuntu-latest')
    })

    it('should have steps defined', () => {
      expect(workflowYaml.jobs.build).toHaveProperty('steps')
      expect(Array.isArray(workflowYaml.jobs.build.steps)).toBe(true)
    })

    it('should have at least one step', () => {
      expect(workflowYaml.jobs.build.steps.length).toBeGreaterThan(0)
    })
  })

  describe('Workflow Steps', () => {
    let steps: any[]

    beforeAll(() => {
      steps = workflowYaml.jobs.build.steps
    })

    it('should have exactly 8 steps', () => {
      expect(steps).toHaveLength(8)
    })

    describe('Step 1: Checkout', () => {
      it('should have checkout as first step', () => {
        expect(steps[0].name).toBe('Checkout')
      })

      it('should use actions/checkout action', () => {
        expect(steps[0].uses).toBe('actions/checkout@v2')
      })
    })

    describe('Step 2: Install Dependencies', () => {
      it('should install dependencies', () => {
        expect(steps[1].name).toBe('Install Dependencies')
      })

      it('should install pnpm globally and project dependencies', () => {
        expect(steps[1].run).toBe('npm install -g pnpm && pnpm install')
      })

      it('should use pnpm package manager', () => {
        expect(steps[1].run).toContain('pnpm')
      })
    })

    describe('Step 3: Install Vercel CLI', () => {
      it('should install Vercel CLI', () => {
        expect(steps[2].name).toBe('Install Vercel CLI')
      })

      it('should install latest version globally', () => {
        expect(steps[2].run).toBe('npm install --global vercel@latest')
      })
    })

    describe('Step 4: Pull Vercel Environment', () => {
      it('should pull Vercel environment information', () => {
        expect(steps[3].name).toBe('Pull Vercel Environment Information')
      })

      it('should use production environment', () => {
        expect(steps[3].run).toContain('--environment=production')
      })

      it('should use VERCEL_TOKEN secret', () => {
        expect(steps[3].run).toContain('${{ secrets.VERCEL_TOKEN }}')
      })

      it('should use --yes flag for non-interactive mode', () => {
        expect(steps[3].run).toContain('--yes')
      })
    })

    describe('Step 5: Build Project', () => {
      it('should build project artifacts', () => {
        expect(steps[4].name).toBe('Build Project Artifacts')
      })

      it('should build for production', () => {
        expect(steps[4].run).toContain('--prod')
      })

      it('should use VERCEL_TOKEN secret', () => {
        expect(steps[4].run).toContain('${{ secrets.VERCEL_TOKEN }}')
      })
    })

    describe('Step 6: Deploy to Vercel', () => {
      it('should deploy project artifacts', () => {
        expect(steps[5].name).toBe('Deploy Project Artifacts to Vercel')
      })

      it('should deploy prebuilt artifacts', () => {
        expect(steps[5].run).toContain('--prebuilt')
      })

      it('should deploy to production', () => {
        expect(steps[5].run).toContain('--prod')
      })

      it('should use VERCEL_TOKEN secret', () => {
        expect(steps[5].run).toContain('${{ secrets.VERCEL_TOKEN }}')
      })
    })

    describe('Step 7: Typecheck', () => {
      it('should run typecheck', () => {
        expect(steps[6].name).toBe('Typecheck')
      })

      it('should use pnpm typecheck command', () => {
        expect(steps[6].run).toBe('pnpm typecheck')
      })
    })

    describe('Step 8: Lint', () => {
      it('should run lint', () => {
        expect(steps[7].name).toBe('Lint')
      })

      it('should use pnpm lint command', () => {
        expect(steps[7].run).toBe('pnpm lint')
      })
    })
  })

  describe('Security Best Practices', () => {
    it('should use secrets for sensitive tokens', () => {
      const workflowStr = workflowContent
      expect(workflowStr).toContain('secrets.VERCEL_TOKEN')
      expect(workflowStr).not.toMatch(/token=['"][a-zA-Z0-9]{20,}['"]/)
    })

    it('should not contain hardcoded credentials', () => {
      expect(workflowContent).not.toMatch(/password\s*[:=]\s*['"][^'"]+['"]/)
      expect(workflowContent).not.toMatch(/api[-_]?key\s*[:=]\s*['"][^'"]+['"]/)
    })
  })

  describe('Workflow Order and Dependencies', () => {
    it('should checkout before installing dependencies', () => {
      const steps = workflowYaml.jobs.build.steps
      const checkoutIndex = steps.findIndex((s: any) => s.name === 'Checkout')
      const depsIndex = steps.findIndex((s: any) => s.name === 'Install Dependencies')
      expect(checkoutIndex).toBeLessThan(depsIndex)
    })

    it('should install dependencies before building', () => {
      const steps = workflowYaml.jobs.build.steps
      const depsIndex = steps.findIndex((s: any) => s.name === 'Install Dependencies')
      const buildIndex = steps.findIndex((s: any) => s.name === 'Build Project Artifacts')
      expect(depsIndex).toBeLessThan(buildIndex)
    })

    it('should build before deploying', () => {
      const steps = workflowYaml.jobs.build.steps
      const buildIndex = steps.findIndex((s: any) => s.name === 'Build Project Artifacts')
      const deployIndex = steps.findIndex((s: any) => s.name === 'Deploy Project Artifacts to Vercel')
      expect(buildIndex).toBeLessThan(deployIndex)
    })

    it('should run quality checks (typecheck, lint) after deployment', () => {
      const steps = workflowYaml.jobs.build.steps
      const deployIndex = steps.findIndex((s: any) => s.name === 'Deploy Project Artifacts to Vercel')
      const typecheckIndex = steps.findIndex((s: any) => s.name === 'Typecheck')
      const lintIndex = steps.findIndex((s: any) => s.name === 'Lint')
      expect(deployIndex).toBeLessThan(typecheckIndex)
      expect(deployIndex).toBeLessThan(lintIndex)
    })
  })

  describe('Edge Cases and Error Scenarios', () => {
    it('should handle missing VERCEL_TOKEN gracefully in syntax', () => {
      // Verify the syntax is correct for accessing secrets
      const vercelSteps = workflowYaml.jobs.build.steps.filter(
        (s: any) => s.run && s.run.includes('VERCEL_TOKEN')
      )
      vercelSteps.forEach((step: any) => {
        expect(step.run).toMatch(/\$\{\{\s*secrets\.VERCEL_TOKEN\s*\}\}/)
      })
    })

    it('should not have duplicate step names', () => {
      const steps = workflowYaml.jobs.build.steps
      const stepNames = steps.map((s: any) => s.name).filter(Boolean)
      const uniqueNames = new Set(stepNames)
      expect(stepNames.length).toBe(uniqueNames.size)
    })

    it('should have all steps with either uses or run property', () => {
      const steps = workflowYaml.jobs.build.steps
      steps.forEach((step: any, index: number) => {
        const hasUsesOrRun = step.uses || step.run
        expect(hasUsesOrRun).toBeTruthy()
      }, `Step at index ${steps.indexOf(steps.find((s: any) => !s.uses && !s.run))} has neither uses nor run`)
    })
  })

  describe('Vercel Integration', () => {
    it('should use Vercel CLI commands', () => {
      const hasVercelCommands = workflowYaml.jobs.build.steps.some(
        (s: any) => s.run && s.run.includes('vercel')
      )
      expect(hasVercelCommands).toBe(true)
    })

    it('should pull, build, and deploy in correct order', () => {
      const steps = workflowYaml.jobs.build.steps
      const pullIndex = steps.findIndex((s: any) => s.run && s.run.includes('vercel pull'))
      const buildIndex = steps.findIndex((s: any) => s.run && s.run.includes('vercel build'))
      const deployIndex = steps.findIndex((s: any) => s.run && s.run.includes('vercel deploy'))
      
      expect(pullIndex).toBeGreaterThan(-1)
      expect(buildIndex).toBeGreaterThan(-1)
      expect(deployIndex).toBeGreaterThan(-1)
      expect(pullIndex).toBeLessThan(buildIndex)
      expect(buildIndex).toBeLessThan(deployIndex)
    })
  })

  describe('Package Manager Consistency', () => {
    it('should use pnpm consistently', () => {
      const steps = workflowYaml.jobs.build.steps
      const scriptSteps = steps.filter((s: any) => 
        s.run && (s.run.includes('typecheck') || s.run.includes('lint') || s.run.includes('install'))
      )
      
      scriptSteps.forEach((step: any) => {
        if (!step.run.includes('npm install') && !step.run.includes('vercel')) {
          expect(step.run).toContain('pnpm')
        }
      })
    })
  })
})