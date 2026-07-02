import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:mobile_flutter/main.dart';
import 'package:mobile_flutter/models/app_state.dart';

void main() {
  testWidgets('IndusBrainApp smoke test - verifies login screen loads', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => AppState()),
        ],
        child: const IndusBrainApp(),
      ),
    );

    // Verify that the login screen header text is present.
    expect(find.text('IndusBrain AI'), findsOneWidget);
    expect(find.text('Sign In to Workspace'), findsOneWidget);
  });
}
