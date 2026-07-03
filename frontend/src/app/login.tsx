import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated as RNAnimated,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Sprout,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react-native";
import { useTheme } from "../hooks/useTheme";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Url  } from "../services/api"

const loginSchema = z.object({
  identifier: z.string().min(2, { message: "Enter your username" }),
  password: z.string().min(4, { message: "Enter your password" }),
});
type LoginFormValues = z.infer<typeof loginSchema>;

const LoginScreen = () => {
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const [pwdFocused, setPwdFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const fadeAnim = useRef(new RNAnimated.Value(0)).current;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  React.useEffect(() => {
    RNAnimated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const onSubmit = async (data: LoginFormValues) => {
  setLoading(true);
  setAuthError(null);

  try {
    const response = await axios.post(
      Url.login,
      {
        username: data.identifier.trim(),
        password: data.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      const user = response.data.user;

            // Save data properly for storage.ts
      await AsyncStorage.setItem("fws_token", response.data.access_token);
      await AsyncStorage.setItem("fws_user", JSON.stringify({
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
        assigned_checklists: [] // Employees will need this array
      }));

      if (user.role === "manager") {
        router.replace("/(tabs)/manager");
      } else {
        router.replace("/(tabs)/dashboard");
      }
    } else {
      setAuthError(response.data.message);
    }
  } catch (error: any) {
    setAuthError(
      error.response?.data?.message ||
      "Unable to connect to the server."
    );
  } finally {
    setLoading(false);
  }
};

  const s = styles(colors, isDark);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <RNAnimated.View
          style={{
            opacity: fadeAnim,
            paddingHorizontal: 24,
            paddingVertical: 48,
          }}
        >
          {/* ── Brand Hero ── */}
          <View style={s.hero}>
            <View style={s.logoRing}>
              <View style={s.logoInner}>
                <Sprout size={44} color={colors.primary} strokeWidth={1.8} />
              </View>
            </View>
            <Text style={s.brand}>FarmFlow</Text>
            <Text style={s.brandSub}>FARM MANAGEMENT</Text>
            <Text style={s.tagline}>
              Modern animal farm operations for every field worker.
            </Text>
          </View>

          {/* ── Form Card ── */}
          <View style={s.card}>
            <View style={s.cardAccent} />
            <View style={{ padding: 28 }}>
              <Text style={s.cardTitle}>Sign In</Text>
              <Text style={s.cardSubtitle}>
                Use your username and password to access tasks and reports
              </Text>

              {/* ── Username Field ── */}
              <View style={{ marginTop: 20, marginBottom: 8 }}>
                <Text style={s.fieldLabel}>USERNAME</Text>
                <Controller
                  control={control}
                  name="identifier"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View
                      style={[
                        s.inputRow,
                        focused && {
                          borderColor: colors.primary,
                          borderWidth: 2,
                        },
                        errors.identifier && {
                          borderColor: colors.dangerMid,
                          borderWidth: 2,
                        },
                      ]}
                    >
                      <TextInput
                        value={value}
                        onChangeText={(t) => {
                          onChange(t);
                          setAuthError(null);
                        }}
                        onBlur={() => {
                          onBlur();
                          setFocused(false);
                        }}
                        onFocus={() => setFocused(true)}
                        placeholder="e.g. David or Chairman"
                        placeholderTextColor={colors.textMuted}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={[s.input, { color: colors.text }]}
                        returnKeyType="next"
                      />
                    </View>
                  )}
                />
                {errors.identifier && (
                  <View style={s.errorRow}>
                    <AlertCircle size={12} color={colors.dangerMid} />
                    <Text style={[s.errorText, { color: colors.dangerMid }]}>
                      {" "}
                      {errors.identifier.message}
                    </Text>
                  </View>
                )}
              </View>

              {/* ── Password Field ── */}
              <View style={{ marginBottom: 8 }}>
                <Text style={s.fieldLabel}>PASSWORD</Text>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View
                      style={[
                        s.inputRow,
                        pwdFocused && {
                          borderColor: colors.primary,
                          borderWidth: 2,
                        },
                        errors.password && {
                          borderColor: colors.dangerMid,
                          borderWidth: 2,
                        },
                      ]}
                    >
                      <TextInput
                        value={value}
                        onChangeText={(t) => {
                          onChange(t);
                          setAuthError(null);
                        }}
                        onBlur={() => {
                          onBlur();
                          setPwdFocused(false);
                        }}
                        onFocus={() => setPwdFocused(true)}
                        placeholder="Enter your password"
                        placeholderTextColor={colors.textMuted}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={[s.input, { color: colors.text }]}
                        returnKeyType="go"
                        onSubmitEditing={handleSubmit(onSubmit)}
                      />
                      <Pressable
                        onPress={() => setShowPassword((prev) => !prev)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        style={{ marginLeft: 8, padding: 2 }}
                      >
                        {showPassword ? (
                          <EyeOff size={18} color={colors.textMuted} />
                        ) : (
                          <Eye size={18} color={colors.textMuted} />
                        )}
                      </Pressable>
                    </View>
                  )}
                />
                {errors.password && (
                  <View style={s.errorRow}>
                    <AlertCircle size={12} color={colors.dangerMid} />
                    <Text style={[s.errorText, { color: colors.dangerMid }]}>
                      {" "}
                      {errors.password.message}
                    </Text>
                  </View>
                )}
              </View>

              {/* ── Auth Error Banner ── */}
              {authError && (
                <View
                  style={[
                    s.authBanner,
                    {
                      backgroundColor: colors.dangerLight,
                      borderColor: colors.dangerMid + "30",
                    },
                  ]}
                >
                  <AlertCircle size={15} color={colors.dangerMid} />
                  <Text style={[s.authBannerText, { color: colors.dangerMid }]}>
                    {" "}
                    {authError}
                  </Text>
                </View>
              )}

              {/* ── CTA Button ── */}
              <Pressable
                onPress={handleSubmit(onSubmit)}
                disabled={loading}
                style={({ pressed }) => [
                  s.cta,
                  {
                    backgroundColor: loading
                      ? colors.primaryLight
                      : colors.primary,
                  },
                  pressed && { opacity: 0.88, transform: [{ scale: 0.98 }] },
                ]}
              >
                {loading ? (
                  <Text style={s.ctaLabel}>Signing in…</Text>
                ) : (
                  <>
                    <Text style={s.ctaLabel}>Sign In</Text>
                    <ArrowRight
                      size={18}
                      color="#FFFFFF"
                      style={{ marginLeft: 8 }}
                    />
                  </>
                )}
              </Pressable>
            </View>
          </View>

          <Text style={[s.footer, { color: colors.textMuted }]}>
            FarmFlow · v2.0.0 · Secured with JWT
          </Text>
        </RNAnimated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = (colors: any, isDark: boolean) =>
  StyleSheet.create({
    hero: {
      alignItems: "center",
      marginBottom: 32,
    },
    logoRing: {
      width: 100,
      height: 100,
      borderRadius: 30,
      backgroundColor: colors.primaryGlow,
      borderWidth: 2,
      borderColor: colors.primary + "25",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 20,
      elevation: 8,
    },
    logoInner: {
      width: 72,
      height: 72,
      borderRadius: 20,
      backgroundColor: colors.card,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    },
    brand: {
      fontSize: 34,
      fontWeight: "900",
      letterSpacing: -1,
      color: colors.text,
    },
    brandSub: {
      fontSize: 12,
      fontWeight: "800",
      letterSpacing: 5,
      color: colors.primary,
      marginTop: 2,
    },
    tagline: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 8,
      fontStyle: "italic",
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 24,
      overflow: "hidden",
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: isDark ? 0.4 : 0.06,
      shadowRadius: 24,
      elevation: 6,
      borderWidth: 1,
      borderColor: colors.cardBorder,
    },
    cardAccent: {
      height: 4,
      backgroundColor: colors.primary,
      width: "100%",
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: "900",
      letterSpacing: -0.5,
      color: colors.text,
    },
    cardSubtitle: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 4,
    },
    fieldLabel: {
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 1.5,
      color: colors.textSecondary,
      marginBottom: 8,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.inputBg,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: colors.divider,
      paddingHorizontal: 16,
      height: 54,
    },
    input: {
      flex: 1,
      fontSize: 15,
      fontWeight: "600",
    },
    errorRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 6,
      marginLeft: 4,
    },
    errorText: {
      fontSize: 12,
      fontWeight: "600",
    },
    authBanner: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      marginBottom: 12,
    },
    authBannerText: {
      fontSize: 12,
      fontWeight: "600",
      flex: 1,
    },
    cta: {
      height: 54,
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 8,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 14,
      elevation: 8,
    },
    ctaLabel: {
      fontSize: 16,
      fontWeight: "800",
      color: "#FFFFFF",
      letterSpacing: 0.3,
    },

    footer: {
      textAlign: "center",
      fontSize: 11,
      marginTop: 32,
      letterSpacing: 0.5,
    },
  });
export default LoginScreen;