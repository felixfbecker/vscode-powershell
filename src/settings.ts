/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

'use strict';

import vscode = require('vscode');
import utils = require('./utils');

enum CodeFormattingPreset {
    Custom,
    Allman,
    OTBS,
    Stroustrup
}

export interface IBugReportingSettings {
    project: string;
}

export interface ICodeFormattingSettings {
    preset: CodeFormattingPreset;
    openBraceOnSameLine: boolean;
    newLineAfterOpenBrace: boolean;
    newLineAfterCloseBrace: boolean;
    whitespaceBeforeOpenBrace: boolean;
    whitespaceBeforeOpenParen: boolean;
    whitespaceAroundOperator: boolean;
    whitespaceAfterSeparator: boolean;
    ignoreOneLineBlock: boolean;
    alignPropertyValuePairs: boolean;
}

export interface IScriptAnalysisSettings {
    enable?: boolean;
    settingsPath: string;
}

export interface IDebuggingSettings {
    createTemporaryIntegratedConsole?: boolean;
}

export interface IDeveloperSettings {
    featureFlags?: string[];
    powerShellExePath?: string;
    bundledModulesPath?: string;
    editorServicesLogLevel?: string;
    editorServicesWaitForDebugger?: boolean;
    powerShellExeIsWindowsDevBuild?: boolean;
}

export interface ISettings {
    powerShellExePath?: string;
    startAutomatically?: boolean;
    useX86Host?: boolean;
    enableProfileLoading?: boolean;
    scriptAnalysis?: IScriptAnalysisSettings;
    debugging?: IDebuggingSettings;
    developer?: IDeveloperSettings;
    codeFormatting?: ICodeFormattingSettings;
    integratedConsole?: IIntegratedConsoleSettings;
    bugReporting?: IBugReportingSettings
}

export interface IIntegratedConsoleSettings {
    showOnStartup?: boolean;
    focusConsoleOnExecute?: boolean;
}

export function load(): ISettings {
    let configuration: vscode.WorkspaceConfiguration =
        vscode.workspace.getConfiguration(
            utils.PowerShellLanguageId);

    let defaultBugReportingSettings: IBugReportingSettings = {
        project: "https://github.com/PowerShell/vscode-powershell"
    };

    let defaultScriptAnalysisSettings: IScriptAnalysisSettings = {
        enable: true,
        settingsPath: ""
    };

    let defaultDebuggingSettings: IDebuggingSettings = {
        createTemporaryIntegratedConsole: false,
    };

    let defaultDeveloperSettings: IDeveloperSettings = {
        featureFlags: [],
        powerShellExePath: undefined,
        bundledModulesPath: undefined,
        editorServicesLogLevel: "Normal",
        editorServicesWaitForDebugger: false,
        powerShellExeIsWindowsDevBuild: false
    };

    let defaultCodeFormattingSettings: ICodeFormattingSettings = {
        preset: CodeFormattingPreset.Custom,
        openBraceOnSameLine: true,
        newLineAfterOpenBrace: true,
        newLineAfterCloseBrace: true,
        whitespaceBeforeOpenBrace: true,
        whitespaceBeforeOpenParen: true,
        whitespaceAroundOperator: true,
        whitespaceAfterSeparator: true,
        ignoreOneLineBlock: true,
        alignPropertyValuePairs: true
    };

    let defaultIntegratedConsoleSettings: IIntegratedConsoleSettings = {
        showOnStartup: true,
        focusConsoleOnExecute: true
    };

    return {
        startAutomatically: configuration.get<boolean>("startAutomatically", true),
        powerShellExePath: configuration.get<string>("powerShellExePath", undefined),
        useX86Host: configuration.get<boolean>("useX86Host", false),
        enableProfileLoading: configuration.get<boolean>("enableProfileLoading", false),
        scriptAnalysis: configuration.get<IScriptAnalysisSettings>("scriptAnalysis", defaultScriptAnalysisSettings),
        debugging: configuration.get<IDebuggingSettings>("debugging", defaultDebuggingSettings),
        developer: configuration.get<IDeveloperSettings>("developer", defaultDeveloperSettings),
        codeFormatting: configuration.get<ICodeFormattingSettings>("codeFormatting", defaultCodeFormattingSettings),
        integratedConsole: configuration.get<IIntegratedConsoleSettings>("integratedConsole", defaultIntegratedConsoleSettings),
        bugReporting: configuration.get<IBugReportingSettings>("bugReporting", defaultBugReportingSettings)
    };
}

export function change(settingName: string, newValue: any, global: boolean = false): Thenable<void> {
    let configuration: vscode.WorkspaceConfiguration =
        vscode.workspace.getConfiguration(
            utils.PowerShellLanguageId);

    return configuration.update(settingName, newValue, global);
}
