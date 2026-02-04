import 'package:flutter/material.dart';

void main() {
  runApp(const ArBonKasApp());
}

class ArBonKasApp extends StatelessWidget {
  const ArBonKasApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ArBonKas',
      theme: ThemeData(primarySwatch: Colors.green),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('ArBonKas')),
      body: const Center(
        child: Text('Catatan kas sederhana di Flutter'),
      ),
    );
  }
}
