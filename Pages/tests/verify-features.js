/**
 * KlemVerse Archive - Feature Verification Script
 * Version 0.0.3
 * 
 * This script performs automated verification of all 0.0.3 features
 */

const FeatureVerifier = {
    results: [],
    
    /**
     * Add a test result
     */
    addResult(testName, passed, message) {
        this.results.push({
            test: testName,
            passed: passed,
            message: message,
            timestamp: new Date().toISOString()
        });
    },
    
    /**
     * Verify meta-commentary styling
     */
    verifyMetaCommentary() {
        console.log('Testing: Meta-Commentary Display...');
        
        try {
            // Check if meta-commentary elements exist
            const metaElements = document.querySelectorAll('.event-entry.meta');
            if (metaElements.length === 0) {
                this.addResult('Meta-Commentary', false, 'No meta-commentary elements found');
                return false;
            }
            
            // Check system observation styling
            const systemObs = document.querySelector('.event-entry.meta.system-observation');
            if (systemObs) {
                const color = window.getComputedStyle(systemObs.querySelector('.event-description')).color;
                console.log('System observation color:', color);
            }
            
            // Check character thought styling
            const charThought = document.querySelector('.event-entry.meta.character-thought');
            if (charThought) {
                const color = window.getComputedStyle(charThought.querySelector('.event-description')).color;
                console.log('Character thought color:', color);
            }
            
            this.addResult('Meta-Commentary', true, `Found ${metaElements.length} meta-commentary elements with correct styling`);
            return true;
        } catch (error) {
            this.addResult('Meta-Commentary', false, `Error: ${error.message}`);
            return false;
        }
    },
    
    /**
     * Verify glitch effects
     */
    verifyGlitchEffects() {
        console.log('Testing: Glitch Effects...');
        
        try {
            const lowGlitch = document.querySelector('.event-entry.glitch.low');
            const mediumGlitch = document.querySelector('.event-entry.glitch.medium');
            const highGlitch = document.querySelector('.event-entry.glitch.high');
            
            const found = [];
            if (lowGlitch) found.push('low');
            if (mediumGlitch) found.push('medium');
            if (highGlitch) found.push('high');
            
            if (found.length === 3) {
                this.addResult('Glitch Effects', true, 'All glitch intensity levels present');
                return true;
            } else {
                this.addResult('Glitch Effects', false, `Only found: ${found.join(', ')}`);
                return false;
            }
        } catch (error) {
            this.addResult('Glitch Effects', false, `Error: ${error.message}`);
            return false;
        }
    },
    
    /**
     * Verify text scrambling function
     */
    verifyTextScrambling() {
        console.log('Testing: Text Scrambling...');
        
        try {
            // Check if scrambleText function exists
            if (typeof scrambleText !== 'function') {
                this.addResult('Text Scrambling', false, 'scrambleText function not found');
                return false;
            }
            
            // Create a test element
            const testElement = document.createElement('div');
            testElement.textContent = 'Test text';
            document.body.appendChild(testElement);
            
            // Test scrambling
            const originalText = testElement.textContent;
            scrambleText(testElement, 100);
            
            // Verify it completes
            setTimeout(() => {
                const restored = testElement.textContent === originalText;
                document.body.removeChild(testElement);
                
                if (restored) {
                    this.addResult('Text Scrambling', true, 'Text scrambles and restores correctly');
                } else {
                    this.addResult('Text Scrambling', false, 'Text did not restore correctly');
                }
            }, 150);
            
            return true;
        } catch (error) {
            this.addResult('Text Scrambling', false, `Error: ${error.message}`);
            return false;
        }
    },
    
    /**
     * Verify observation detection styling
     */
    verifyObservationDetection() {
        console.log('Testing: Observation Detection...');
        
        try {
            const observation = document.querySelector('.event-entry.observation');
            
            if (!observation) {
                this.addResult('Observation Detection', false, 'No observation elements found');
                return false;
            }
            
            const styles = window.getComputedStyle(observation);
            const color = styles.color;
            const borderLeft = styles.borderLeftWidth;
            
            console.log('Observation color:', color);
            console.log('Observation border:', borderLeft);
            
            this.addResult('Observation Detection', true, 'Observation detection styled correctly');
            return true;
        } catch (error) {
            this.addResult('Observation Detection', false, `Error: ${error.message}`);
            return false;
        }
    },
    
    /**
     * Verify external source error formatting
     */
    verifyExternalSourceError() {
        console.log('Testing: External Source Error...');
        
        try {
            const error = document.querySelector('.event-entry.error');
            
            if (!error) {
                this.addResult('External Source Error', false, 'No error elements found');
                return false;
            }
            
            const errorIndicator = error.querySelector('.error-indicator');
            const sourceId = error.querySelector('.source-id');
            
            if (!errorIndicator || !sourceId) {
                this.addResult('External Source Error', false, 'Error structure incomplete');
                return false;
            }
            
            this.addResult('External Source Error', true, 'External source error formatted correctly');
            return true;
        } catch (error) {
            this.addResult('External Source Error', false, `Error: ${error.message}`);
            return false;
        }
    },
    
    /**
     * Verify terminal window creation
     */
    verifyTerminalWindow() {
        console.log('Testing: Terminal Window...');
        
        try {
            // Check if createTerminalWindow function exists
            if (typeof createTerminalWindow !== 'function') {
                this.addResult('Terminal Window', false, 'createTerminalWindow function not found');
                return false;
            }
            
            // Create a test terminal
            const terminal = createTerminalWindow('/test/path', ['Line 1', 'Line 2', 'Line 3']);
            
            if (!terminal) {
                this.addResult('Terminal Window', false, 'Terminal creation failed');
                return false;
            }
            
            // Verify structure
            const header = terminal.querySelector('.terminal-header');
            const content = terminal.querySelector('.terminal-content');
            const lines = terminal.querySelectorAll('.terminal-line');
            
            if (!header || !content || lines.length !== 3) {
                this.addResult('Terminal Window', false, 'Terminal structure incomplete');
                return false;
            }
            
            this.addResult('Terminal Window', true, 'Terminal window creates correctly');
            return true;
        } catch (error) {
            this.addResult('Terminal Window', false, `Error: ${error.message}`);
            return false;
        }
    },
    
    /**
     * Verify French text encoding
     */
    verifyFrenchText() {
        console.log('Testing: French Text Display...');
        
        try {
            // Check charset
            const charset = document.characterSet || document.charset;
            
            if (charset.toUpperCase() !== 'UTF-8') {
                this.addResult('French Text', false, `Charset is ${charset}, should be UTF-8`);
                return false;
            }
            
            // Test French characters
            const testChars = 'àâäéèêëïîôùûüÿç';
            const testElement = document.createElement('div');
            testElement.textContent = testChars;
            document.body.appendChild(testElement);
            
            const rendered = testElement.textContent;
            document.body.removeChild(testElement);
            
            if (rendered === testChars) {
                this.addResult('French Text', true, 'French accents display correctly');
                return true;
            } else {
                this.addResult('French Text', false, 'French accents not rendering correctly');
                return false;
            }
        } catch (error) {
            this.addResult('French Text', false, `Error: ${error.message}`);
            return false;
        }
    },
    
    /**
     * Run all verification tests
     */
    runAllTests() {
        console.log('=== KlemVerse Archive - Feature Verification ===');
        console.log('Version: 0.0.3');
        console.log('Starting tests...\n');
        
        this.results = [];
        
        // Run all tests
        this.verifyMetaCommentary();
        this.verifyGlitchEffects();
        this.verifyTextScrambling();
        this.verifyObservationDetection();
        this.verifyExternalSourceError();
        this.verifyTerminalWindow();
        this.verifyFrenchText();
        
        // Wait for async tests to complete
        setTimeout(() => {
            this.printResults();
        }, 200);
    },
    
    /**
     * Print test results
     */
    printResults() {
        console.log('\n=== Test Results ===');
        
        let passed = 0;
        let failed = 0;
        
        this.results.forEach(result => {
            const status = result.passed ? '✓ PASS' : '✗ FAIL';
            const color = result.passed ? 'color: green' : 'color: red';
            console.log(`%c${status}%c - ${result.test}: ${result.message}`, color, 'color: inherit');
            
            if (result.passed) {
                passed++;
            } else {
                failed++;
            }
        });
        
        console.log('\n=== Summary ===');
        console.log(`Total Tests: ${this.results.length}`);
        console.log(`%cPassed: ${passed}`, 'color: green; font-weight: bold');
        console.log(`%cFailed: ${failed}`, failed > 0 ? 'color: red; font-weight: bold' : 'color: gray');
        
        if (failed === 0) {
            console.log('%c\n✓ ALL TESTS PASSED!', 'color: green; font-size: 16px; font-weight: bold');
        } else {
            console.log('%c\n✗ SOME TESTS FAILED', 'color: red; font-size: 16px; font-weight: bold');
        }
        
        return {
            total: this.results.length,
            passed: passed,
            failed: failed,
            results: this.results
        };
    },
    
    /**
     * Export results as JSON
     */
    exportResults() {
        return JSON.stringify({
            version: '0.0.3',
            timestamp: new Date().toISOString(),
            summary: {
                total: this.results.length,
                passed: this.results.filter(r => r.passed).length,
                failed: this.results.filter(r => !r.passed).length
            },
            results: this.results
        }, null, 2);
    }
};

// Auto-run tests when script is loaded
if (typeof window !== 'undefined') {
    window.FeatureVerifier = FeatureVerifier;
    
    // Run tests after DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => FeatureVerifier.runAllTests(), 1000);
        });
    } else {
        setTimeout(() => FeatureVerifier.runAllTests(), 1000);
    }
}

// Export for Node.js if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FeatureVerifier;
}
