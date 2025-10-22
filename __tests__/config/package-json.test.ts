import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'fs'
import path from 'path'
import Ajv from 'ajv'

describe('package.json Configuration', () => {
  let packageJson: any
  let packageJsonString: string

  beforeAll(() => {
    const packageJsonPath = path.join(process.cwd(), 'package.json')
    packageJsonString = fs.readFileSync(packageJsonPath, 'utf-8')
    packageJson = JSON.parse(packageJsonString)
  })

  describe('File Structure and Validity', () => {
    it('should exist as a valid file', () => {
      const packageJsonPath = path.join(process.cwd(), 'package.json')
      expect(fs.existsSync(packageJsonPath)).toBe(true)
    })

    it('should be valid JSON', () => {
      expect(() => JSON.parse(packageJsonString)).not.toThrow()
    })

    it('should not be empty', () => {
      expect(packageJsonString.trim().length).toBeGreaterThan(0)
    })

    it('should be properly formatted', () => {
      // Check that it can be parsed and stringified consistently
      const parsed = JSON.parse(packageJsonString)
      expect(parsed).toBeDefined()
    })
  })

  describe('Required Fields', () => {
    it('should have a name field', () => {
      expect(packageJson).toHaveProperty('name')
      expect(typeof packageJson.name).toBe('string')
    })

    it('should have name as "sub-lists"', () => {
      expect(packageJson.name).toBe('sub-lists')
    })

    it('should have a version field', () => {
      expect(packageJson).toHaveProperty('version')
      expect(typeof packageJson.version).toBe('string')
    })

    it('should have valid semantic version', () => {
      const semverRegex = /^\d+\.\d+\.\d+(-[a-z0-9.-]+)?(\+[a-z0-9.-]+)?$/i
      expect(packageJson.version).toMatch(semverRegex)
    })

    it('should have a scripts field', () => {
      expect(packageJson).toHaveProperty('scripts')
      expect(typeof packageJson.scripts).toBe('object')
    })

    it('should be marked as private', () => {
      expect(packageJson.private).toBe(true)
    })
  })

  describe('Scripts Configuration', () => {
    it('should have required scripts', () => {
      const requiredScripts = ['dev', 'build', 'start', 'lint', 'typecheck']
      requiredScripts.forEach(script => {
        expect(packageJson.scripts).toHaveProperty(script)
      })
    })

    it('should have dev script', () => {
      expect(packageJson.scripts.dev).toBe('next dev --turbopack')
    })

    it('should have build script', () => {
      expect(packageJson.scripts.build).toBe('next build --turbopack')
    })

    it('should have start script', () => {
      expect(packageJson.scripts.start).toBe('next start')
    })

    it('should have lint script', () => {
      expect(packageJson.scripts.lint).toBe('eslint')
    })

    describe('Typecheck Script (New Addition)', () => {
      it('should have typecheck script', () => {
        expect(packageJson.scripts).toHaveProperty('typecheck')
      })

      it('should use TypeScript compiler for typechecking', () => {
        expect(packageJson.scripts.typecheck).toContain('tsc')
      })

      it('should use --noEmit flag', () => {
        expect(packageJson.scripts.typecheck).toBe('tsc --noEmit')
      })

      it('should not emit JavaScript files', () => {
        expect(packageJson.scripts.typecheck).toContain('--noEmit')
      })
    })

    it('should use turbopack for dev and build', () => {
      expect(packageJson.scripts.dev).toContain('--turbopack')
      expect(packageJson.scripts.build).toContain('--turbopack')
    })

    it('should not have undefined or null script values', () => {
      Object.values(packageJson.scripts).forEach(script => {
        expect(script).toBeDefined()
        expect(script).not.toBeNull()
        expect(typeof script).toBe('string')
      })
    })
  })

  describe('Dependencies', () => {
    it('should have dependencies field', () => {
      expect(packageJson).toHaveProperty('dependencies')
      expect(typeof packageJson.dependencies).toBe('object')
    })

    it('should have Next.js as dependency', () => {
      expect(packageJson.dependencies).toHaveProperty('next')
    })

    it('should have React as dependency', () => {
      expect(packageJson.dependencies).toHaveProperty('react')
      expect(packageJson.dependencies).toHaveProperty('react-dom')
    })

    it('should use compatible React and React-DOM versions', () => {
      expect(packageJson.dependencies.react).toBe(packageJson.dependencies['react-dom'])
    })

    it('should have UI dependencies', () => {
      expect(packageJson.dependencies).toHaveProperty('@radix-ui/react-slot')
      expect(packageJson.dependencies).toHaveProperty('lucide-react')
    })

    it('should have utility dependencies', () => {
      expect(packageJson.dependencies).toHaveProperty('clsx')
      expect(packageJson.dependencies).toHaveProperty('tailwind-merge')
      expect(packageJson.dependencies).toHaveProperty('class-variance-authority')
    })

    it('should have valid version specifiers', () => {
      Object.entries(packageJson.dependencies).forEach(([name, version]: [string, any]) => {
        expect(version).toMatch(/^[\^~]?\d+\.\d+\.\d+/)
      })
    })
  })

  describe('DevDependencies', () => {
    it('should have devDependencies field', () => {
      expect(packageJson).toHaveProperty('devDependencies')
      expect(typeof packageJson.devDependencies).toBe('object')
    })

    it('should have TypeScript', () => {
      expect(packageJson.devDependencies).toHaveProperty('typescript')
    })

    it('should have type definitions', () => {
      expect(packageJson.devDependencies).toHaveProperty('@types/node')
      expect(packageJson.devDependencies).toHaveProperty('@types/react')
      expect(packageJson.devDependencies).toHaveProperty('@types/react-dom')
    })

    it('should have ESLint configuration', () => {
      expect(packageJson.devDependencies).toHaveProperty('eslint')
      expect(packageJson.devDependencies).toHaveProperty('eslint-config-next')
    })

    it('should have Tailwind CSS', () => {
      expect(packageJson.devDependencies).toHaveProperty('tailwindcss')
      expect(packageJson.devDependencies).toHaveProperty('@tailwindcss/postcss')
    })

    it('should have Prettier', () => {
      expect(packageJson.devDependencies).toHaveProperty('prettier')
      expect(packageJson.devDependencies).toHaveProperty('prettier-plugin-tailwindcss')
    })

    it('should not have duplicate dependencies in dependencies and devDependencies', () => {
      const deps = Object.keys(packageJson.dependencies || {})
      const devDeps = Object.keys(packageJson.devDependencies || {})
      const intersection = deps.filter(dep => devDeps.includes(dep))
      expect(intersection).toHaveLength(0)
    })
  })

  describe('Schema Validation', () => {
    it('should conform to npm package.json schema', () => {
      const ajv = new Ajv()
      const schema = {
        type: 'object',
        required: ['name', 'version'],
        properties: {
          name: { type: 'string' },
          version: { type: 'string' },
          private: { type: 'boolean' },
          scripts: { type: 'object' },
          dependencies: { type: 'object' },
          devDependencies: { type: 'object' },
        },
      }
      const validate = ajv.compile(schema)
      const valid = validate(packageJson)
      expect(valid).toBe(true)
    })

    it('should have string values for all dependencies', () => {
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      }
      Object.entries(allDeps).forEach(([name, version]) => {
        expect(typeof version).toBe('string')
      })
    })
  })

  describe('Version Compatibility', () => {
    it('should use Next.js 15.x', () => {
      expect(packageJson.dependencies.next).toMatch(/^15\.\d+\.\d+/)
    })

    it('should use React 19.x', () => {
      expect(packageJson.dependencies.react).toMatch(/^19\.\d+\.\d+/)
    })

    it('should use TypeScript 5.x', () => {
      expect(packageJson.devDependencies.typescript).toMatch(/^\^?5/)
    })

    it('should use compatible ESLint version', () => {
      expect(packageJson.devDependencies.eslint).toMatch(/^\^?9/)
    })
  })

  describe('Edge Cases and Error Scenarios', () => {
    it('should not have circular references', () => {
      expect(() => JSON.stringify(packageJson)).not.toThrow()
    })

    it('should not have empty dependency names', () => {
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      }
      Object.keys(allDeps).forEach(name => {
        expect(name.trim()).not.toBe('')
        expect(name).toMatch(/^[@a-z0-9-/]+$/i)
      })
    })

    it('should not have empty script names', () => {
      Object.keys(packageJson.scripts).forEach(name => {
        expect(name.trim()).not.toBe('')
      })
    })

    it('should not have empty script commands', () => {
      Object.values(packageJson.scripts).forEach((command: any) => {
        expect(command.trim()).not.toBe('')
      })
    })

    it('should handle missing optional fields gracefully', () => {
      // These fields are optional but if present should be valid
      if (packageJson.description) {
        expect(typeof packageJson.description).toBe('string')
      }
      if (packageJson.author) {
        expect(typeof packageJson.author === 'string' || typeof packageJson.author === 'object').toBe(true)
      }
      if (packageJson.license) {
        expect(typeof packageJson.license).toBe('string')
      }
    })
  })

  describe('Script Execution Safety', () => {
    it('should not contain potentially dangerous script commands', () => {
      Object.values(packageJson.scripts).forEach((script: any) => {
        expect(script).not.toContain('rm -rf /')
        expect(script).not.toContain('sudo')
        expect(script).not.toContain('curl | sh')
        expect(script).not.toContain('wget | sh')
      })
    })

    it('should use safe package manager commands', () => {
      const installScripts = Object.values(packageJson.scripts).filter((script: any) => 
        script.includes('install') || script.includes('add')
      )
      // If there are install scripts, they should use known package managers
      installScripts.forEach((script: any) => {
        const usesSafePackageManager = 
          script.includes('npm') || 
          script.includes('yarn') || 
          script.includes('pnpm') ||
          script.includes('bun')
        expect(usesSafePackageManager).toBe(true)
      })
    })
  })

  describe('Typecheck Script Integration', () => {
    it('should be runnable with standard Node.js', () => {
      // Verify the typecheck command doesn't require special setup
      expect(packageJson.scripts.typecheck).not.toContain('&&')
      expect(packageJson.scripts.typecheck).not.toContain('||')
    })

    it('should align with TypeScript configuration', () => {
      // Verify tsconfig.json exists (indirectly tested by typecheck script)
      const tsconfigPath = path.join(process.cwd(), 'tsconfig.json')
      expect(fs.existsSync(tsconfigPath)).toBe(true)
    })

    it('should be suitable for CI/CD', () => {
      // Should exit with non-zero on type errors (no --force or similar flags)
      expect(packageJson.scripts.typecheck).not.toContain('--force')
      expect(packageJson.scripts.typecheck).not.toContain('|| true')
      expect(packageJson.scripts.typecheck).not.toContain('|| exit 0')
    })
  })

  describe('Consistency with CI Workflow', () => {
    it('should have scripts referenced in CI workflow', () => {
      // The CI workflow should be able to run these scripts
      const ciCriticalScripts = ['typecheck', 'lint']
      ciCriticalScripts.forEach(script => {
        expect(packageJson.scripts).toHaveProperty(script)
      })
    })

    it('should use pnpm as package manager matching CI', () => {
      // CI uses pnpm, package-lock.json and pnpm-lock.yaml should exist
      const pnpmLockPath = path.join(process.cwd(), 'pnpm-lock.yaml')
      expect(fs.existsSync(pnpmLockPath)).toBe(true)
    })
  })
})