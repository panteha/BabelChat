
// 'use strict';
// describe("Thermostat", function() {
//   var thermostat;
//   beforeEach(function() {
//     thermostat = new Thermostat();
//   });
//   it("Starts at 20 degrees", function() {
//     expect(thermostat.temperature()).toEqual(thermostat._DEFAULT_TEMPERATURE);
//   });
//   it("Can increase the temperature", function(){
//     thermostat.increaseTemperature();
//     expect(thermostat.temperature()).toEqual(thermostat._DEFAULT_TEMPERATURE + 1);
//   });
//   it("Can decrease the temperature", function() {
//     thermostat.decreaseTemperature();
//     expect(thermostat.temperature()).toEqual(thermostat._DEFAULT_TEMPERATURE - 1);
//   });
//   it("Has a minimum temperature of 10", function(){
//     for(var i = 0; i < 10; i++) { thermostat.decreaseTemperature(); }
//     expect(function(){ thermostat.decreaseTemperature(); }).toThrow(new Error('Minimum temperature is 10 degrees'));
//   });
//   it("Is in power saving mode by default", function() {
//     expect(thermostat.isPowerSaving()).toBe(true);
//   });
//   it("Can reset the temperature to 20 degrees", function() {
//     thermostat.increaseTemperature();
//     thermostat.resetTemperature();
//     expect(thermostat.temperature()).toEqual(thermostat._DEFAULT_TEMPERATURE);
//   });
//   describe("togglePowerSaving", function() {
//     it("Can toggle power saving mode", function() {
//       thermostat.togglePowerSaving();
//       expect(thermostat.isPowerSaving()).toBe(false);
//       thermostat.togglePowerSaving();
//       expect(thermostat.isPowerSaving()).toBe(true);
//     });
//     it("Resets temperature to maximum of 25 degrees when turned on", function() {
//       thermostat.togglePowerSaving();
//       for(var i = 0; i < 10; i++) { thermostat.increaseTemperature(); }
//       thermostat.togglePowerSaving();
//       expect(thermostat.temperature()).toEqual(25);
//     });
//   });
//   describe("Power Saving mode On", function() {
//     it("Restrict maximum temperature to 25 degrees", function() {
//       for(var i = 0; i < 5; i++) { thermostat.increaseTemperature(); }
//       expect(function(){ thermostat.increaseTemperature(); }).toThrow(new Error('Maximum temperature in power saving mode is 25 degrees'));
//     });
//   });
//   describe("Power Saving mode Off", function() {
//     it("Restricts maximum temperature to 32 degrees", function() {
//       thermostat.togglePowerSaving();
//       for(var i = 0; i < 12; i++) { thermostat.increaseTemperature(); }
//       expect(function(){ thermostat.increaseTemperature(); }).toThrow(new Error('Maximum temperature is 32 degrees'));
//     });
//   });
//   describe("currentEnergyUsage", function() {
//     it("Returns 'Low usage' when temperature is <18 degrees", function() {
//       spyOn(thermostat, 'temperature').and.returnValue(17);
//       expect(thermostat.currentEnergyUsage()).toEqual('low');
//     });
//     it("Returns 'Medium usage' when temperature is between 18 and 24 degrees", function() {
//       spyOn(thermostat, 'temperature').and.returnValue(21);
//       expect(thermostat.currentEnergyUsage()).toEqual('medium');
//     });
//     it("Returns 'High usage' when temperature is >24 degrees", function() {
//       spyOn(thermostat, 'temperature').and.returnValue(30);
//       expect(thermostat.currentEnergyUsage()).toEqual('high');
//     });
//   });
// });
