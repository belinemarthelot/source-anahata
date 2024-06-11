import { Grid, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import "./planity.css";

const PlanityWidget = () => {
    const theme = useTheme();

    const apiKey = '-NkoE5l-d0wOfKbop84P';
    useEffect(() => {
        const containerId = 'planity-container';
        const loadScripts = () => {
            console.log('loading scripts');
            const polyfillsScript = document.createElement('script');
            polyfillsScript.src = 'https://d2skjte8udjqxw.cloudfront.net/widget/production/2/polyfills.latest.js';
            polyfillsScript.async = true;

            const appScript = document.createElement('script');
            appScript.src = 'https://d2skjte8udjqxw.cloudfront.net/widget/production/2/app.latest.js';
            appScript.async = true;

            polyfillsScript.onload = () => {
                const container = document.getElementById(containerId);
                window.planity = {
                    key: apiKey,
                    primaryFontFamily: theme.typography.fontFamily,
                    container: container,
                    options: {
                        onServiceAdd: function(){
                            container?.scrollIntoView();
                        }
                    }
                };
            };
            
            document.body.appendChild(polyfillsScript);
            document.body.appendChild(appScript);
        };
        
        loadScripts();
    }, []);
    
    return <Grid id="planity-container" pt={2} style={{width: "100%", height: "100%", backgroundColor: theme.palette.background.paper}}></Grid>;
    };

    export default PlanityWidget;
