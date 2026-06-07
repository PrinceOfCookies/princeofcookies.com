export const requirements = ["Java 21 or newer", "Maven 3.9 or newer recommended"];

export const projectFocus = [
  "Basic containers",
  "Basic controls and inputs",
  "Basic grid and dock layout",
  "Floating windows",
  "Scene theme application",
  "Derma-style wrapper direction",
  "Per-component demo launcher",
];

export const commonHelpers = [
  "position(double x, double y)",
  "size(double width, double height)",
  "minSize(double width, double height)",
  "maxSize(double width, double height)",
  "padding(Insets insets)",
  "padding(double value)",
  "spacing(double value)",
  "align(Pos pos)",
  "fillWidth()",
  "fillHeight()",
  "text(String value)",
  "visible(boolean value)",
  "enabled(boolean value)",
  "cssClass(String className)",
  "style(String inlineStyle)",
  "anchorFill()",
];

export const missingComponents = [
  "Forms",
  "Menus",
  "Tables",
  "Trees",
  "Tabs",
  "Higher-level form composition and validation",
  "Advanced docking or layout systems",
  "Rich theme token APIs",
];

export const currentGoals = [
  "Keep the public API coherent",
  "Rebuild features from a stable small base",
  "Document real behavior instead of planned behavior",
];

export const minimalApp = `package com.example;

import com.princeofcookies.dervafx.DervaFX;
import com.princeofcookies.dervafx.DervaGrid;
import com.princeofcookies.dervafx.DervaRoot;
import com.princeofcookies.dervafx.DervaTheme;
import com.princeofcookies.dervafx.DervaWindow;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;

public final class ExampleApp extends Application {
    @Override
    public void start(Stage stage) {
        AnchorPane host = new AnchorPane();

        DervaRoot root = DervaFX.root().anchorFill();
        host.getChildren().add(root.getNode());
        AnchorPane.setTopAnchor(root.getNode(), 0.0);
        AnchorPane.setRightAnchor(root.getNode(), 0.0);
        AnchorPane.setBottomAnchor(root.getNode(), 0.0);
        AnchorPane.setLeftAnchor(root.getNode(), 0.0);

        DervaFX.setTheme(DervaTheme.derma());

        DervaWindow window = DervaFX.window("Example")
            .position(24, 24)
            .size(320, 200);

        DervaGrid grid = DervaFX.grid()
            .hgap(8)
            .vgap(8)
            .add(DervaFX.label("Project"), 0, 0)
            .add(DervaFX.textField().prompt("Project name"), 1, 0)
            .add(DervaFX.checkBox("Remember layout"), 0, 1, 2, 1)
            .add(DervaFX.button("Test"), 1, 2);

        window.add(grid);

        root.add(window);

        Scene scene = new Scene(host, 900, 600);
        DervaFX.applyTheme(scene);

        stage.setScene(scene);
        stage.show();
    }
}`;

export const exampleSnippet = `DervaRoot root = DervaFX.root();

DervaFX.setTheme(DervaTheme.derma());

DervaWindow window = DervaFX.window("Base Window")
    .position(24, 24)
    .size(360, 220);

window.add(
    DervaFX.grid()
        .hgap(8)
        .vgap(8)
        .add(DervaFX.label("Project"), 0, 0)
        .add(DervaFX.textField().prompt("Project name"), 1, 0)
        .add(DervaFX.checkBox("Remember layout"), 0, 1, 2, 1)
        .add(DervaFX.button("Click me"), 1, 2)
);

root.add(window);`;

export const themeSnippet = `Scene scene = new Scene(host, 900, 600);
DervaFX.applyTheme(scene);`;

export const customThemeSnippet = `DervaTheme custom = DervaTheme.of("custom")
    .stylesheetResource("/com/example/my-theme.css");

DervaFX.setTheme(custom);`;
